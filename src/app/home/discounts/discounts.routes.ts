import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DiscountsListComponent } from './discounts-list/discounts-list.component';
import { ApplyDiscountComponent } from './apply-discount/apply-discount.component';



const routes: Routes = [
    { path: '', children:[ 
        {path:'ListDiscounts', component:DiscountsListComponent},
        {path:'ApplyDiscount', component:ApplyDiscountComponent},
        {path: '**', redirectTo:'ListDiscounts'}
    ] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DiscountsRoutingModule {}
