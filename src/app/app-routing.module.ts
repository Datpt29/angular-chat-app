import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './features/auth/auth.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';

import { UserComponent } from './features/user/user.component';
import { UserListComponent } from './features/user/user-list/user-list.component';
import { UserInforComponent } from './features/user/user-infor/user-infor.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ]
  },

  {
    path: 'user',
    component: UserComponent,
    children: [
      { path: 'list', component: UserListComponent },
      { path: 'infor', component: UserInforComponent },
    ]
  },
  { path: 'auth', loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule) },
  { path: 'user', loadChildren: () => import('./features/user/user.module').then(m => m.UserModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
