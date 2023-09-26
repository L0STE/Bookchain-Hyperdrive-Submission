use anchor_lang::{prelude::*};
use anchor_spl::token::{Mint, Token, TokenAccount, Transfer, transfer};
use anchor_spl::associated_token::AssociatedToken;
use solana_program::log::sol_log_slice;
use solana_program::program_memory::sol_memcpy;

use crate::errors::ProjError;
use crate::state::closed_project::ClosedProject;
use crate::state::project::Project;

#[derive(Accounts)]
#[instruction(id: u64)]
pub struct ProjectClose<'info> {
    #[account(
        mut,
        seeds = [b"vault", project.key().as_ref()],
        bump,
        token::mint = token,
        token::authority = project
    )]
    pub project_vault: Box<Account<'info, TokenAccount>>,
    #[account(
        mut,
        seeds = [b"project", id.to_le_bytes().as_ref()], 
        bump,
    )]
    /// CHECK: This is... maybe safe?
    pub project: UncheckedAccount<'info>,
    // pub project: Account<'info, Project>,
    // #[account(
    //     init, 
    //     payer = authority, 
    //     seeds = [b"project", id.to_le_bytes().as_ref()], 
    //     bump,
    //     space = ClosedProject::space() + 20
    // )]
    // pub closed_project: Account<'info, ClosedProject>,

    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(
        mut,
        associated_token::mint = token,
        associated_token::authority = authority
    )]
    pub authority_ata: Account<'info, TokenAccount>,
    pub token: Box<Account<'info, Mint>>,       // The token that is used as payment
    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
}

impl<'info> ProjectClose<'info> {
    pub fn close(
        &mut self,
        id: u64,
    ) -> Result<()> {
        // Original Borrow
        let info = self.project.to_account_info();
        let mut data = info.try_borrow_mut_data()?;

        // Deserialize
        let mut reader = &data[..];
        let project = Project::try_deserialize(&mut reader)?;

        // Authorization Checks
        require!(project.id == id, ProjError::NotAuthorized);
        require!(project.authority.key() == self.authority.key(), ProjError::NotAuthorized);

        // Transform to ClosedProject
        let closed_project = ClosedProject {
            id: project.id,
            authority: project.authority,
            name: project.name,
            project_bump: project.project_bump,
        };

        // Serialize
        let mut writer: Vec<u8> = vec![];
        closed_project.try_serialize(&mut writer)?;
        // require_gt!(ClosedProject::space(), Project::space());
        let padding_len = Project::space() - ClosedProject::space();
        writer.extend_from_slice(&vec![0; padding_len]);

        // Copy back to original data
        sol_memcpy(&mut data, &writer, writer.len());

        if project.balance > 0 {
            let seeds = &[
                "project".as_bytes(),
                &project.id.to_le_bytes(),
                &[project.project_bump]
            ];
            let signer_seeds = &[&seeds[..]];

            let cpi_program = self.system_program.to_account_info();
            let cpi_accounts = Transfer{
                from: self.project_vault.to_account_info(), 
                to: self.authority_ata.to_account_info(),
                authority: self.project.to_account_info(),
            };
            let cpi_context = CpiContext::new_with_signer(cpi_program, cpi_accounts, signer_seeds);

            transfer(cpi_context, project.balance)?;
        }
        Ok(())
    }
}

#[event]
pub struct StructContents {
    pub c: Vec<u8>
}