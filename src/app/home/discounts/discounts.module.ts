import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiscountsListComponent } from './discounts-list/discounts-list.component';
import { ApplyDiscountComponent } from './apply-discount/apply-discount.component';
import { DiscountsRoutingModule } from './discounts.routes';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DiscountsListComponent,
    ApplyDiscountComponent
  ],
  imports: [
    CommonModule,
    DiscountsRoutingModule, 
    FormsModule
  ]
})
export class DiscountsModule { }
