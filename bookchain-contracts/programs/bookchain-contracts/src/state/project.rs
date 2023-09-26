use anchor_lang::prelude::*;

#[account]
pub struct Project {
    pub id: u64,
    pub authority: Pubkey,
    pub name: String,
    pub balance: u64,
    pub token: Pubkey,
    pub employee_number: u8,
    pub project_bump: u8,
}

impl Project {
    pub fn init(

        &mut self, 
        id: u64,
        authority: Pubkey,
        name: String,
        balance: u64,
        token: Pubkey,
        employee_number: u8,
        project_bump: u8,

    ) -> Result<()> {

        self.id = id;
        self.authority = authority;
        self.name = name;
        self.balance = balance;
        self.token = token;
        self.employee_number = employee_number;
        self.project_bump = project_bump;

        Ok(())
    }
}

impl Project {
    pub fn space() -> usize {    
        8 +      // Descrimintor
        8 +      // id
        32 +     // authority
        4 +     // name
        8 +     // balance
        32 +    // token
        1 +     // employee_number
        1       // project_bump
    }
}