import { Routes } from '@angular/router';
import { UserListComponent } from './composant/user/user-list/user-list.component';
import { AuthComponent } from './composant/login/auth/auth.component';
import { AccountListComponent } from './composant/account/account-list/account-list.component';
import { AfterLoginService } from './services/after-login.service';
import { RegisterComponent } from './login/register/register.component';

export const routes: Routes = [
  { path : '', component:AuthComponent},
  { path : 'login', component:AuthComponent},
  { path : 'registre', component:RegisterComponent},
  { path : 'users', component:UserListComponent, canActivate: [AfterLoginService]},
  { path : 'accounts', component:AccountListComponent, canActivate: [AfterLoginService]},

];
