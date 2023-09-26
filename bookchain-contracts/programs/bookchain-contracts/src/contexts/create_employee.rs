use anchor_lang::prelude::*;

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
        employee_wallet: Pubkey,
        username: String,
        department: String,
        title: String,
        employee_bump: u8,
    ) -> Result<()> {
        //Employee Check
        require!(username.len() < 20, EmplErr::NameTooLong);
        require!(department.len() < 20, EmplErr::DepartmentTooLong);
        require!(title.len() < 20, EmplErr::TitleTooLong);

        //Project Check
        require!(self.project.authority.key() == self.initializer.key(), ProjError::NotAuthorized);

        //Update project State
        self.project.employee_number += 1;

        //Employee Init
        let id = self.project.employee_number + 1 ;
        let project = self.project.key();
        let employee_wallet = employee_wallet;
        let username = username;
        let title = title;
        let department = department;
        let is_active = false;
        let is_freelancer = false;
        let last_compensation_amount = 0;
        let last_from_date = 0;
        let last_to_date = 0;
        let payed_invoice = 0;
        let employee_bump = employee_bump;

        self.employee.init(
            id,
            project,
            employee_wallet,
            username,
            title,
            department,
            is_active,
            is_freelancer,
            last_compensation_amount,
            last_from_date,
            last_to_date,
            payed_invoice,
            employee_bump,
        )
    }
}