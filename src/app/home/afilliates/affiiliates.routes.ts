import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ListAffiliatesComponent } from './list-affiliates/list-affiliates.component';
import { AffiliateMedicRecordComponent } from './affiliate-medic-record/affiliate-medic-record.component';



const routes: Routes = [
    { path: '',
        children:[
            {path:'ListAffiliates', component:ListAffiliatesComponent},
            {path:'AffiliateMedicRecord/:uid/:aid', component:AffiliateMedicRecordComponent},
            {path:'**', redirectTo:'ListAffiliates'}
        ]

    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AffiliateRoutingModule {}
