use anchor_lang::{prelude::*};

use crate::errors::ProjError;
use crate::state::project::Project;

#[derive(Accounts)]
pub struct ProjectChangeState<'info> {
    #[account(mut)]
    pub project: Account<'info, Project>,

    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

//It's not possible to 
impl<'info> ProjectChangeState<'info> {
    pub fn project_change_auth(
        &mut self,
        auth: Pubkey,
    ) -> Result<()> {
        require!(self.project.authority.key() == self.user.key(), ProjError::NotAuthorized);

        self.project.authority = auth;

        Ok(())
    }
}

impl<'info> ProjectChangeState<'info> {
    pub fn project_change_name(
        &mut self,
        name: String,
    ) -> Result<()> {
        require!(name.len() <20, ProjError::TooManyCharacters);
        require!(self.project.authority.key() == self.user.key(), ProjError::NotAuthorized);
        
        self.project.name = name;

        Ok(())
    }
}