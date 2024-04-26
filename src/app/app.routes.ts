import { Routes } from '@angular/router';
import { UserListComponent } from './composant/user/user-list/user-list.component';
import { AuthComponent } from './composant/login/auth/auth.component';
import { AccountListComponent } from './composant/account/account-list/account-list.component';

export const routes: Routes = [
  { path : '', component:AuthComponent},
  { path : 'login', component:AuthComponent},
  { path : 'users', component:UserListComponent},
  { path : 'accounts', component:AccountListComponent},

];
