import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserInforComponent } from './user-infor/user-infor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from 'src/app/shared/layout/layout.module';


@NgModule({
  declarations: [
    UserComponent,
    UserListComponent,
    UserInforComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    LayoutModule
  ]
})
export class UserModule { }
