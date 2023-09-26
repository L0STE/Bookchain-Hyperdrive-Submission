use anchor_lang::prelude::*;

#[account]
pub struct Employee {
    pub id: u8,
    pub project_pda: Pubkey,
    pub employee_wallet: Pubkey,
    pub username: String,
    pub title: String,
    pub department: String,
    pub is_active: bool,
    pub is_freelancer: bool,
    pub last_compensation_amount: u64,
    pub last_from_date: i64,
    pub last_to_date: i64,
    pub payed_invoice: u8,
    pub employee_bump: u8,
}

impl Employee {
    pub fn init(

        &mut self,
        id: u8,
        project_pda: Pubkey,
        employee_wallet: Pubkey,
        username: String,
        title: String,
        department: String,
        is_active: bool,
        is_freelancer: bool,
        last_compensation_amount: u64,
        last_from_date: i64,
        last_to_date: i64,
        payed_invoice: u8,
        employee_bump: u8,

    ) -> Result<()> {

        self.id = id;
        self.project_pda = project_pda;
        self.employee_wallet = employee_wallet;
        self.username = username;
        self.title = title;
        self.department = department;
        self.is_active = is_active;
        self.is_freelancer = is_freelancer;
        self.last_compensation_amount = last_compensation_amount;
        self.last_from_date = last_from_date;
        self.last_to_date = last_to_date;
        self.payed_invoice = payed_invoice;
        self.employee_bump = employee_bump;

        Ok(())
    }
}

impl Employee {
    pub fn space() -> usize {
        8 +     //  Discriminator
        4 +     //  id
        32 +    //  project_pda
        32 +    //  employee_wallet
        4 +     //  username
        4 +     //  title
        4 +     //  department
        1 +     //  is_active
        1 +     //  is_freelancer
        8 +     //  last_compensation_amount
        8 +     //  last_from_date
        8 +     //  last_to_date
        1 +     //  payed_invoice
        1       //  employee_bump      
    }
}