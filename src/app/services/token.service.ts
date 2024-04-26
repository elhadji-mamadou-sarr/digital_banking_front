import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_LOGIN } from '../config';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private iss = {
    login : URL_LOGIN
  }

  handle(token : any) {
    this.set(token);
   // console.log(this.paylod(token));

  }

  set(token: any) {
    localStorage.setItem('token', token)
  };


  get(): any{
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('token')
    } else {
      console.warn('localStorage is not available in this environment');
    }

  };


  remove() {
    localStorage.removeItem('token')
  };


  isValid( ) {
    const token = this.get();
    if (token!=null) {
      const paylod = this.paylod(token);
      if(paylod){
        return Object.values(this.iss).indexOf(paylod.iss) > -1 ? true : false;
      }
    }
    return false;
  }

  getHeaders(): HttpHeaders {
    const token = this.get();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

  paylod(token: any) {
    const paylod = token.split('.')[1];
    return this.decode(paylod);
  }


  decode(paylod: any) {
    return JSON.parse(atob(paylod));
  }

  loggedIn(){
    return this.isValid();
  }


}
