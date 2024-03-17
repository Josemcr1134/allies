import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MyWalletComponent } from './my-wallet/my-wallet.component';



const routes: Routes = [
    { 
        path: '',
        children:[
            {path:'MyWallet', component:MyWalletComponent},
            {path:'**', redirectTo:'MyWallet'},
        ]
    
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WalletRoutingModule {}
