import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login, User } from '../models';
import { Observable, catchError } from 'rxjs';
import { URL_LOGIN } from '../config';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http : HttpClient) { }

  login(user : Login) : Observable<any>{
    return this.http.post<any>(URL_LOGIN, user).pipe(
      catchError((error) => {
        throw error;
      })
    )
  }

}
