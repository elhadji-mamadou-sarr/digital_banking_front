export interface User{
  id? : number,
  username : string,
  email : string
  first_name : string,
  last_name : string,
  password : string,
}

export interface Login{
  username : string,
  password : string,
}

export interface BankAccount{
  id : number,
  numero_compte : number,
  solde : number,
  client : number,
}

export interface Operation{
  amount : number
}
