import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MyDatesComponent } from './my-dates/my-dates.component';
import { PatientsTreatedComponent } from './patients-treated/patients-treated.component';
import { MedicalRecordDatesComponent } from './medical-record-dates/medical-record-dates.component';


const routes: Routes = [

 {
  path:'',
  children:[
    {
      path:'AllDates',
      component:MyDatesComponent
    },{
        path:'PatientsTreated',
        component:PatientsTreatedComponent
    },{
        path:'MedicalRecordDescription/:id',
        component:MedicalRecordDatesComponent
    },{
      path:'',
      redirectTo:'AllDates',
      pathMatch:'full'
    }

  ]
 }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DatesRoutingModule {}
