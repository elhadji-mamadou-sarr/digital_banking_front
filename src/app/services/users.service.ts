import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../models';
import { URL_API } from '../config';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  url = URL_API

  constructor(private http : HttpClient,) { }

  getAllUsers():Observable<User[]>{
    const url = `${this.url}/users`
    return this.http.get<User[]>(url)
  }

  addUser(user: User):Observable<User>{
    const url = `${this.url}/users/create`
    return this.http.post<User>(url, user)
  }

 getUserById(id :number) : Observable<User> {
    const url = `${this.url}/users/${id}`
    return this.http.get<User>(url)
  }

  updateUser(user : User) : Observable<any> {
    const url = `${this.url}/update/${user.id}`
     return this.http.put<any>(url, user).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    )
   }

   deleteUser(id : number):Observable<any>{
    const url = `${this.url}/users/delete/${id}`
    return this.http.delete<any>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    )
   }



}
