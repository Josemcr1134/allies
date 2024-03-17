import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routes';
import { SharedModule } from '../shared/shared.module';
import { NgxDropzoneModule } from 'ngx-dropzone';


@NgModule({
  declarations: [
    HomeComponent,
  
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    NgxDropzoneModule
  ]
})
export class HomeModule { }
