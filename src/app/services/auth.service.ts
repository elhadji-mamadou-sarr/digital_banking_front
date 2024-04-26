import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private token: TokenService, private http :HttpClient) { }

  private loggedIn = new BehaviorSubject<boolean>(this.token.loggedIn())

  private currentUser: any;

  setCurrentUser(user: any): void {
    this.currentUser = localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getCurrentUser(): any {
    return localStorage.getItem('currentUser');
  }

  authStatus = this.loggedIn.asObservable();

  changeAuthStatus(value :boolean){
    this.loggedIn.next(value);
  }



  logout() : Observable<any>{
    const headers = this.token.getHeaders()
    this.token.remove()
    return this.http.get<any>(`http://127.0.0.1/logout`, {headers})
  }



}
