use anchor_lang::prelude::*;

#[account]
pub struct Employee {
    pub id: u64,
    pub project_pda: Pubkey,
    pub employee_wallet: Pubkey,
    pub username: String,
    pub hire_date: i64,
    pub department: String,
    pub title: String,
    pub compensation_amount: u64,
    pub payed_invoice: u8,
    pub is_active: bool,
    pub auto_renewal: bool,
    pub employee_bump: u8,
}

impl Employee {
    pub fn init(

        &mut self,
        id: u64,
        project_pda: Pubkey,
        employee_wallet: Pubkey,
        username: String,
        hire_date: i64,
        department: String,
        title: String,
        compensation_amount: u64,
        payed_invoice: u8,
        is_active: bool,
        auto_renewal: bool,
        employee_bump: u8,

    ) -> Result<()> {

        self.id = id;
        self.project_pda = project_pda;
        self.employee_wallet = employee_wallet;
        self.username = username;
        self.hire_date = hire_date;
        self.department = department;
        self.title = title;
        self.compensation_amount = compensation_amount;
        self.payed_invoice = payed_invoice;
        self.is_active = is_active;
        self.auto_renewal = auto_renewal;
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
        8 +     //  hire_date
        4 +     //  department
        4 +     //  title
        8 +     //  compensation_amount
        1 +     //  payed_invoice
        1 +     //  is_active
        1 +     //  auto_renewal
        1       //  employee_bump        
    }
}