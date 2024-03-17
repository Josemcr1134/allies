import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MyConfigsComponent } from './my-configs/my-configs.component';
import { ConfigsDetailsComponent } from './configs-details/configs-details.component';
import { UsersConfigsComponent } from './users-configs/users-configs.component';



const routes: Routes = [
    { 
        path: '',
        children:[
            {path:'MyConfigs', component:MyConfigsComponent},
            {path:'ConfigsDetails', component:ConfigsDetailsComponent},
            {path:'UsersConfig/:id/:name', component:UsersConfigsComponent},
            {path:'**', redirectTo:'MyConfigs'}
        ]
    },
   
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ConfigsRoutingModule {}
