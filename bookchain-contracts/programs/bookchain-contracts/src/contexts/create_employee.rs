use anchor_lang::{prelude::*};
use anchor_spl::token::{Mint, Token, TokenAccount};
use anchor_spl::associated_token::AssociatedToken;

use crate::errors::EmplErr;
use crate::errors::ProjError;
use crate::state::project::Project;
use crate::state::employee::Employee;

#[derive(Accounts)]
#[instruction(id: u64)]
pub struct EmployeeInit<'info> {
    #[account(mut)]
    pub project: Account<'info, Project>,
    #[account(
        init, 
        payer = initializer, 
        seeds = [b"employee", project.key().as_ref(), id.to_le_bytes().as_ref()], 
        bump,
        space = Employee::space() + 20 + 20 + 20   //Maximum space for the username, department and title
    )]
    pub employee: Account<'info, Employee>,

    #[account(mut)]
    pub initializer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

impl<'info> EmployeeInit<'info> {
    pub fn init(
        &mut self,
        id: u64,
        employee_wallet: Pubkey,
        username: String,
        department: String,
        title: String,
        compensation_amount: u64,
        employee_bump: u8,
    ) -> Result<()> {
        //Employee Check
        require!(username.len() < 20, EmplErr::NameTooLong);
        require!(department.len() < 20, EmplErr::DepartmentTooLong);
        require!(title.len() < 20, EmplErr::TitleTooLong);
        require!(compensation_amount>0, EmplErr::PayTooLow);

        //Project Check
        require!(self.project.authority.key() == self.initializer.key(), ProjError::NotAuthorized);

        //Update project State
        self.project.employee_number += 1;

        let id = id;
        let project = self.project.key();
        let employee_wallet = employee_wallet;
        let username = username;
        let hire_date = Clock::get()?.unix_timestamp;
        let department = department;
        let title = title;
        let compensation_amount = compensation_amount;
        let payed_invoice = 0;
        let is_active = false;
        let auto_renewal = false;
        let employee_bump = employee_bump;

        self.employee.init(
            id,
            project,
            employee_wallet,
            username,
            hire_date,
            department,
            title,
            compensation_amount,
            payed_invoice,
            is_active,
            auto_renewal,
            employee_bump,
        )
    }
}