import { Component, OnInit } from '@angular/core';
import { User } from '../../models';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  constructor(private userService : UsersService){}

  user : User={
    username : "",
    first_name : "",
    last_name : "",
    email : "",
    password : "",
  }

  succesMessage = ""
  errorMessage  = ""

  ngOnInit(): void {

  }

  registre(){
    const password = this.user.password;
    const confirmPassword = this.confirmPasswordInput.value;
    if (password !== confirmPassword) {
      this.errorMessage = "Les mots de passe ne correspondent pas.";
      return;
    }
    this.userService.addUser(this.user).subscribe({
        next:() => {
          this.succesMessage = 'User ajouter avec succès';
          window.location.reload();
        },
        error: (err) => {
          this.errorMessage = 'Échec de l\'ajout de la User';
          console.error('Erreur :', err);
        }
      });
  }

  get confirmPasswordInput(): HTMLInputElement {
    return document.querySelector('input[name="confPassword"]')!;
  }


}
