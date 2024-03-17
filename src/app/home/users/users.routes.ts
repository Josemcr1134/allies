import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ListUsersComponent } from './list-users/list-users.component';
import { NewUsersComponent } from './new-users/new-users.component';



const routes: Routes = [
    { 
        path: '',
        children:[
            {path:'UserList', component:ListUsersComponent},
            {path:'NewUser', component:NewUsersComponent},
            {path:'**', redirectTo:'UserList'}
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule {}
