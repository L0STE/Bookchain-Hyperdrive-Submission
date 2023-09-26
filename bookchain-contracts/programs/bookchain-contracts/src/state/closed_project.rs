use anchor_lang::prelude::*;

#[account]
pub struct ClosedProject {
    pub id: u64,
    pub authority: Pubkey,
    pub name: String,
    pub project_bump: u8,
}

impl ClosedProject {
    pub fn init(

        &mut self, 
        id: u64,
        authority: Pubkey,
        name: String,
        project_bump: u8,

    ) -> Result<()> {

        self.id = id;
        self.authority = authority;
        self.name = name;
        self.project_bump = project_bump;

        Ok(())
    }
}

impl ClosedProject {
    pub fn space() -> usize {    
        8 +      // Descrimintor
        8 +      // id
        32 +     // authority
        4 +      // name
        1        // project_bump
    }
}