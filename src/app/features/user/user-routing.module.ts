import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserInforComponent } from './user-infor/user-infor.component';

const routes: Routes = [
  { path: '', component: UserListComponent },
  { path: 'userlist', component: UserListComponent },
  { path: 'userinfo', component: UserInforComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
