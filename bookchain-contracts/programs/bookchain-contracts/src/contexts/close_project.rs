use anchor_lang::{prelude::*};
use anchor_spl::token::{Mint, Token, TokenAccount, Transfer, transfer};
use anchor_spl::associated_token::AssociatedToken;

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
        close = authority,
        seeds = [b"project", id.to_le_bytes().as_ref()], 
        bump = project.project_bump,
    )]
    pub project: Account<'info, Project>,
    #[account(
        init, 
        payer = authority, 
        seeds = [b"project", id.to_le_bytes().as_ref()], 
        bump,
        space = ClosedProject::space() + 20
    )]
    pub closed_project: Account<'info, ClosedProject>,

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
        require!(self.project.authority.key() == self.authority.key(), ProjError::NotAuthorized);

        let id = self.project.id;
        let authority = self.project.authority;
        let name = self.project.name.clone();
        let project_bump = self.project.project_bump;

        self.closed_project.init(
            id,
            authority,
            name,
            project_bump,
        );

        if self.project.balance > 0 {

            let seeds = &[
            "project".as_bytes(),
            &self.project.id.to_le_bytes(),
            &[self.project.project_bump]
        ];
        let signer_seeds = &[&seeds[..]];

        let cpi_program = self.system_program.to_account_info();
        let cpi_accounts = Transfer{
            from: self.project_vault.to_account_info(), 
            to: self.authority_ata.to_account_info(),
            authority: self.project.to_account_info(),
        };
        let cpi_context = CpiContext::new_with_signer(cpi_program, cpi_accounts, signer_seeds);

        transfer(cpi_context, self.project.balance)?;

        }

        Ok(())
    }
}