import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyDatesComponent } from './my-dates/my-dates.component';
import { DatesRoutingModule } from './dates.routes';
import { PatientsTreatedComponent } from './patients-treated/patients-treated.component';
import { MedicalRecordDatesComponent } from './medical-record-dates/medical-record-dates.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxDropzoneModule } from 'ngx-dropzone';



@NgModule({
  declarations: [
    MyDatesComponent,
    PatientsTreatedComponent,
    MedicalRecordDatesComponent
  ],
  imports: [
    CommonModule,
    DatesRoutingModule,
    FormsModule,
    RouterModule,
    NgxDropzoneModule
  ]
})
export class DatesModule { }
