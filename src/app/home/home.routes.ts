import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { GuardsGuard } from '../services/guards.guard';
import { AuthGuard } from '../shared/guards/auth.guard';



const routes: Routes = [

    {
        path: '',
        component: HomeComponent,
        canActivate:[AuthGuard],
        children: [
               {
                path:'ControlPanel',
                loadChildren:() => import('./control-panel/control-panel.module').then(m => m.ControlPanelModule)
              },
               {
                path:'Dates',
                loadChildren:() => import('./dates/dates.module').then(m => m.DatesModule)
              },
               {
                path:'Products&Services',
                loadChildren:() => import('./products-services/products-services.module').then(m => m.ProductsServicesModule)
              },
               {
                path:'Affiliates',
                loadChildren:() => import('./afilliates/afilliates.module').then(m => m.AfilliatesModule)
              },
               {
                path:'Discounts',
                loadChildren:() => import('./discounts/discounts.module').then(m => m.DiscountsModule)
              },
               {
                path:'Users',
                loadChildren:() => import('./users/users.module').then(m => m.UsersModule)
              },

               {
                path:'Wallet',
                loadChildren:() => import('./wallet/wallet.module').then(m => m.WalletModule)
              },
               {
                path:'Configs',
                loadChildren:() => import('./config/config.module').then(m => m.ConfigModule)
              },
              {
                path: '**', redirectTo: 'Dates', pathMatch:'full'
              }
        ] ,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule {}
