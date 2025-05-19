import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserInforComponent } from './user-infor/user-infor.component';
import { LoginGuard } from 'src/app/core/guards/login.guard';

const routes: Routes = [
  { path: '', component: UserListComponent, canActivate: [LoginGuard] },
  { path: 'user/userlist', loadChildren: () => import('./user-list/user-list.component').then(m => m.UserListComponent), canActivate: [LoginGuard] },
  { path: 'user/userinfo', loadChildren: () => import('./user-infor/user-infor.component').then(m => m.UserInforComponent), canActivate: [LoginGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
