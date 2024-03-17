import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyConfigsComponent } from './my-configs/my-configs.component';
import { ConfigsDetailsComponent } from './configs-details/configs-details.component';
import { ConfigsRoutingModule } from './config.routes';
import { FormsModule } from '@angular/forms';
import { UsersConfigsComponent } from './users-configs/users-configs.component';



@NgModule({
  declarations: [
    MyConfigsComponent,
    ConfigsDetailsComponent,
    UsersConfigsComponent
  ],
  imports: [
    CommonModule,
    ConfigsRoutingModule,
    FormsModule
  ]
})
export class ConfigModule { }
