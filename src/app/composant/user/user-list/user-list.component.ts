import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { User } from '../../../models';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, DashboardComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit{


  @ViewChild('addDialog') addDialog!: TemplateRef<any>;

  constructor(private userService: UsersService,
    private dialog : MatDialog, private router: Router){}

  succesMessage = ""
  errorMessage  = ""

  users: User[]=[]

  newUser:User = {
    username : "",
    email : "",
    first_name : "",
    last_name : "",
    password : "",
  }

  selectedUser : User | null = null

  ngOnInit(): void {
    this.listUsers()
  }

  listUsers(){
    this.userService.getAllUsers().subscribe({
      next :(value) =>{
        this.users = value
      },
      error:(err) => {
        console.log("Erreur : ",err);
      },
    })
  }


  openAddDialog(user : User | null){
    if (user != null) {
      this.newUser = user
    }
    this.selectedUser = user

    const dialogRef = this.dialog.open(this.addDialog);
    dialogRef.afterClosed().subscribe(() => {
      this.selectedUser = null
    })
  }


  saveUser(): void{
    const password = this.newUser.password;
    const confirmPassword = this.confirmPasswordInput.value;
    if (password !== confirmPassword) {
      this.errorMessage = "Les mots de passe ne correspondent pas.";
      return;
    }

    if (this.selectedUser != null) {

        this.userService.updateUser(this.selectedUser).subscribe({
          next:() => {
            this.succesMessage = 'L\'utilisateur mis à jour avec succès';
            this.listUsers();
          },
          error: (err) => {
            this.errorMessage = 'Échec de la mise à jour de la User';
            console.error('Erreur :', err);
          }
        });

    } else {
      console.log(this.newUser);

      this.userService.addUser(this.newUser).subscribe({
        next:() => {
          this.succesMessage = 'User ajouter avec succès';
          this.listUsers();
        },
        error: (err) => {
          this.errorMessage = 'Échec de l\'ajout de la User';
          console.error('Erreur :', err);
        }
      });

    }

  }



  deleteUser(id : number){
    this.userService.deleteUser(id).subscribe({
      next:(value) =>{
        this.succesMessage = "Utilisateur supprimer avec succes"
        window.location.reload();
      },
      error:(err)=> {
        this.errorMessage = "Echec de la suppression de l'utilisateur"
        console.log("Erreur ", err);
      },
    })
  }


  closeDialog(): void {
    this.dialog.closeAll();
    window.location.reload();
  }

  get confirmPasswordInput(): HTMLInputElement {
    return document.querySelector('input[name="confPassword"]')!;
  }

}
