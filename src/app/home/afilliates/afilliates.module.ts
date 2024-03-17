import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListAffiliatesComponent } from './list-affiliates/list-affiliates.component';
import { AffiliateMedicRecordComponent } from './affiliate-medic-record/affiliate-medic-record.component';
import { AffiliateRoutingModule } from './affiiliates.routes';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ListAffiliatesComponent,
    AffiliateMedicRecordComponent
  ],
  imports: [
    CommonModule,
    AffiliateRoutingModule,
    FormsModule
  ]
})
export class AfilliatesModule { }
