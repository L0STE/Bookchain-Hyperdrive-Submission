use anchor_lang::prelude::*;

mod contexts;
mod errors;
mod state;

use contexts::*;

declare_id!("Dad4s5C2MTErQtFCwai2DgmskftMPM8iLxrJ3MRXrz62");

#[program]
pub mod bookchain_contracts {
    use super::*;

    pub fn project_init(
        ctx: Context<ProjectInit>,
        id: u64,
        name: String,
        project_bump: u8,
    ) -> Result<()> {
        ctx.accounts.init(id, name, project_bump)?;

        Ok(())
    }

    pub fn project_change_auth(
        ctx: Context<ProjectChangeState>,
        auth: Pubkey,
    ) -> Result<()> {
        ctx.accounts.project_change_auth(auth)?;

        Ok(())
    }

    pub fn project_change_name(
        ctx: Context<ProjectChangeState>,
        name: String,
    ) -> Result<()> {
        ctx.accounts.project_change_name(name)?;

        Ok(())
    }

    pub fn project_deposit(
        ctx: Context<ProjectChangeBalance>,
        amount: u64,
    ) -> Result<()> {
        ctx.accounts.project_deposit(amount)?;

        Ok(())
    }

    pub fn project_withdraw(
        ctx: Context<ProjectChangeBalance>,
        amount: u64,
    ) -> Result<()> {
        ctx.accounts.project_withdraw(amount)?;

        Ok(())
    }

    pub fn project_close(
        ctx: Context<ProjectClose>,
        id: u64,
    ) -> Result<()> {
        ctx.accounts.close(id)
    }

    pub fn create_employee(
        ctx: Context<EmployeeInit>,
        id: u64,
        employee_wallet: Pubkey,
        username: String,
        department: String,
        title: String,
        compensation_amount: u64,
        employee_bump: u8,
    ) -> Result<()> {
        ctx.accounts.init(id, employee_wallet, username, department, title, employee_bump,)?;
        
        Ok(())
    }
}