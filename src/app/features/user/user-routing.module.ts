import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserInforComponent } from './user-infor/user-infor.component';

const routes: Routes = [
  { path: '', component: UserListComponent },
  { path: 'user/userlist', component: UserListComponent },
  { path: 'user/userinfo', component: UserInforComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
