import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListUsersComponent } from './list-users/list-users.component';
import { NewUsersComponent } from './new-users/new-users.component';
import { UsersRoutingModule } from './users.routes';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ListUsersComponent,
    NewUsersComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule
  ]
})
export class UsersModule { }
