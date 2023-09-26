use anchor_lang::error_code;

#[error_code]
pub enum ProjError {
    #[msg("The project name is too long. [max 20 characters]")]
    TooManyCharacters,
    #[msg("Something went wrong with your deposit. [The amount was < 0, try with a bigger number]")]
    DepositErr,
    #[msg("Something went wrong with your withdraw. [The amount was > of the project balance, try with a smaller number]")]
    WithdrawErr,
    #[msg("You are not the owner of this project. [Authority mismatch]")]
    NotAuthorized,
    #[msg("The token you are trying to deposit is not the right one. [Token mismatch]")]
    WrongToken,
}

#[error_code]
pub enum EmplErr {
    #[msg("The username is too long. [max 20 characters]")]
    NameTooLong,
    #[msg("The department input is too long. [max 20 characters]")]
    DepartmentTooLong,
    #[msg("The title input is too long. [max 20 characters]")]
    TitleTooLong,
    #[msg("There seem to be an error. [The compensation amount was </= 0, try with a bigger number]")]
    PayTooLow,
    #[msg("You don't have enough money to pay your employee.")]
    NotEnoughFunds,
    
    #[msg("You are not on the payroll.")]
    NotRecursive,
}

#[error_code]
pub enum InvErr {
    #[msg("You need to wait till the time of the invoice has passed")]
    TimeNotPassed,
    #[msg("You already claimed this invoice")]
    AlreadyClaimed,
    #[msg("You are not the employee of this invoice")]
    NotAuthorized,
}