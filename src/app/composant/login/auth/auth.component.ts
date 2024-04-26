import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../../../models';
import { AuthService } from '../../../services/auth.service';
import { LoginService } from '../../../services/login.service';
import { TokenService } from '../../../services/token.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit{

  constructor(
    private loginService : LoginService,
    private tokenService : TokenService,
    private router : Router,
    private  authService: AuthService,
    ){}

  public loggedIn!: boolean;
  errorMessage = "";

    public user : Login={
    username : '',
    password :''
  }



  ngOnInit(): void {
    this.authService.authStatus.subscribe(
      value => this.loggedIn = value
    )
  }

  loginErreur=""
  login(){
    this.loginService.login(this.user).subscribe(
      (data)=> {
        this.handleResponse(data)
        console.log(data);
        console.log("Connexion Réussi");
      },
      (err)=>{
        console.log(err);
        if (err.status == 400) {
          this.loginErreur = "Identifiant incorrecte"
        }
        this.errorMessage = "Echec de la connexion"

      }

    )
  }

  handleResponse(data :any){
    this.tokenService.handle(data.access_token);
    this.authService.changeAuthStatus(true);

    this.router.navigateByUrl('/users');

  }



}
