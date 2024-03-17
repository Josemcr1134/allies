import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyWalletComponent } from './my-wallet/my-wallet.component';
import { WalletRoutingModule } from './wallet.routes';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MyWalletComponent
  ],
  imports: [
    CommonModule,
    WalletRoutingModule,
    FormsModule
  ]
})
export class WalletModule { }
