import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { URL_API } from '../config';
import { BankAccount, Operation, User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  url = URL_API

  constructor(private http : HttpClient,) { }

  getAllAccounts():Observable<BankAccount[]>{
    return this.http.get<BankAccount[]>(this.url)
  }

  searchByAccountNumber(accountNumber: string): Observable<BankAccount[]> {
    const url = `${this.url}?numero_compte=${accountNumber}`;
    return this.http.get<BankAccount[]>(url);
  }

  getAllAccountsInactive():Observable<User[]>{
    const url = `${this.url}/inactive_users`
    return this.http.get<User[]>(url)
  }

  addAccount(account: BankAccount):Observable<BankAccount>{
    const url = `${this.url}/create`
    return this.http.post<BankAccount>(url, account)
  }

 getAccountById(id :number) : Observable<BankAccount> {
    const url = `${this.url}/${id}`
    return this.http.get<BankAccount>(url)
  }

  updateAccount(account : BankAccount) : Observable<any> {
    const url = `${this.url}/${account.id}`
     return this.http.put<any>(url, account).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    )
   }

   deleteAccount(id : number):Observable<any>{
    const url = `${this.url}/delete/${id}`
    return this.http.delete<any>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    )
  }

  deposit(id : number, op : Operation):Observable<any>{
     const url = `${this.url}/${id}/deposit`
     return this.http.put(url, op)
  }

  withdraw(id : number, op : Operation):Observable<any>{
     const url = `${this.url}/${id}/withdraw`
     return this.http.put(url, op)
  }



}
