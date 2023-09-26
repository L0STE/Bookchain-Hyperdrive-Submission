use anchor_lang::{prelude::*};
use anchor_spl::token::{Mint, Token, TokenAccount};
use anchor_spl::associated_token::AssociatedToken;

use crate::errors::ProjError;
use crate::state::project::Project;

#[derive(Accounts)]
#[instruction(id: u64)]
pub struct ProjectInit<'info> {
    #[account(
        init, 
        payer = initializer, 
        seeds = [b"project", id.to_le_bytes().as_ref()], 
        bump,
        space = Project::space() + 20           // 20 = max number of characters in the project name
    )]
    pub project: Account<'info, Project>,

    #[account(mut)]
    pub initializer: Signer<'info>,
    pub token: Box<Account<'info, Mint>>,       // The token that is used as payment
    pub system_program: Program<'info, System>,
}

impl<'info> ProjectInit<'info> {
    pub fn init(
        &mut self,
        id: u64,
        name: String,
        project_bump: u8,
    ) -> Result<()> {
        //We made space only for 20 character
        require!(name.len() <20, ProjError::TooManyCharacters);

        let id = id;
        let authority = self.initializer.key();
        let name = name;
        let balance = 0;
        let token = self.token.key();
        let employee_number = 0;
        let project_bump = project_bump;

        self.project.init(
            id,
            authority,
            name,
            balance,
            token,
            employee_number,
            project_bump,
        )

    }
}