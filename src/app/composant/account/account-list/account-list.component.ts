import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AccountService } from '../../../services/account.service';
import { BankAccount, Operation, User } from '../../../models';
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { Router } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { error } from 'node:console';

@Component({
  selector: 'app-account-list',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, DashboardComponent, CommonModule],
  templateUrl: './account-list.component.html',
  styleUrl: './account-list.component.css'
})
export class AccountListComponent implements OnInit{


  @ViewChild('addDialog') addDialog!: TemplateRef<any>;
  @ViewChild('depositDialog') depositDialog!: TemplateRef<any>;

  constructor(private accountService: AccountService,
    private userService : UsersService,
    private dialog : MatDialog, private router: Router){}

  succesMessage = ""
  errorMessage  = ""

  client! : User

  accounts: BankAccount[]=[]

  newAccount : BankAccount = {
    id : 0,
    numero_compte : 0,
    solde : 0,
    client : 0,
  }

  users: User[]=[]

  selectedAccount : BankAccount | null = null

  ngOnInit(): void {
    this.listAccounts()
  }

  userFullName: string = '';
  getClient(id: number): Observable<any> {
    return this.userService.getUserById(id).pipe(
      switchMap(user => {
        const fullName = `${user.first_name} ${user.last_name}`;
        return of(fullName); // Retourne l'observable du nom complet
      })
    );
  }

  listAccounts(){
    this.accountService.getAllAccounts().subscribe({
      next :(value) =>{
        this.accounts = value
      },
      error:(err) => {
        console.log("Erreur : ",err);
      },
    })
  }


  searchTerm: string = '';

searchByAccountNumber() {
  if (this.searchTerm.trim() !== '') {
    this.accountService.searchByAccountNumber(this.searchTerm).subscribe(
      (result) => {
        this.accounts = result;
      },
      (error) => {
        console.error('Erreur lors de la recherche :', error);
      }
    );
  }
}



  listUsers(){
    this.accountService.getAllAccountsInactive().subscribe({
      next :(value) =>{
        this.users = value
      },
      error:(err) => {
        console.log("Erreur : ",err);
      },
    })
  }



  openAddDialog(account : BankAccount | null){
    if (account != null) {
      this.newAccount = account
    }
    this.selectedAccount = account
    this.listUsers()
    const dialogRef = this.dialog.open(this.addDialog);
    dialogRef.afterClosed().subscribe(() => {
      this.selectedAccount = null
    })
  }

  operation : Operation = {
    amount : 0
  }
  id_client! : number
  transaction = ""

  openDepositDialog(op : string, id : number){
    this.id_client = id
    this.transaction = op
    const dialogRef = this.dialog.open(this.depositDialog);
    dialogRef.afterClosed().subscribe(() => {
    })

  }

  saveOperation(){
    if (this.transaction=='deposit') {
      this.accountService.deposit(this.id_client, this.operation).subscribe({
        next:() => {
          this.succesMessage = 'Transaction effectuer avec succès';
          this.closeDialog();
        },
        error: (err) => {
          this.errorMessage = 'Échec de la transaction';
          console.error('Erreur :', err);
        }
      });
    } else {
      this.accountService.withdraw(this.id_client, this.operation).subscribe({
        next:() => {
          this.succesMessage = 'Transaction effectuer avec succès';
          this.closeDialog();
          this.listAccounts()
        },
        error: (err) => {
          this.errorMessage = err.error.detail;
          console.error('Erreur :', err);
        }
      });
    }

  }



  saveAccount(): void{
    if (this.selectedAccount != null) {

        this.accountService.updateAccount(this.selectedAccount).subscribe({
          next:() => {
            this.succesMessage = 'Le compte mis à jour avec succès';
            this.listAccounts();
          },
          error: (err) => {
            this.errorMessage = 'Échec de la mise à jour du compte';
            console.error('Erreur :', err);
          }
        });
    } else {
      this.accountService.addAccount(this.newAccount).subscribe({
        next:() => {
          this.succesMessage = 'Compte ajouter avec succès';
          this.closeDialog();
        },
        error: (err) => {
          this.errorMessage = 'Échec de l\'ajout de la User';
          console.error('Erreur :', err);
        }
      });

    }

  }



  deleteAccount(id : number){
    this.accountService.deleteAccount(id).subscribe({
      next:(value) =>{
        this.succesMessage = "compte supprimer avec succes"
        window.location.reload();
      },
      error:(err)=> {
        this.errorMessage = "Echec de la suppression du compte"
        console.log("Erreur ", err);
      },
    })
  }


  closeDialog(): void {
    this.dialog.closeAll();
  }





}
function of(fullName: string): any {
  throw new Error('Function not implemented.');
}

