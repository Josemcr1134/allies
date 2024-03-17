import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppointmentsService } from '../../../services/appointments.service';

@Component({
  selector: 'app-affiliate-medic-record',
  templateUrl: './affiliate-medic-record.component.html',
  styleUrls: ['./affiliate-medic-record.component.css']
})
export class AffiliateMedicRecordComponent implements OnInit {

  public appointment_id:string ='';
  public specialty_name:string = '';
  public user_name:string = '';
  public user_gender:string = '';
  public user_avatar:string = '';
  public user_document:string = '';
  public service_date:string = '';
  public anamnesis:any[] = [];
  public internal_notes:string = '';
  public reason_for_consultation:string = '';
  public recommendations:string = '';
  public diagnosis:string = '';
  public analysis_and_plan:string = '';
  public service_type:string = '';
  public observations:string = '';
  public Medicines:any[] = [];
  public start_date_inhability:string = '';
  public end_date_inhability:string = '';
  constructor(private medicalFormulaSvc:AppointmentsService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(({aid}) => {
      this.appointment_id = aid;
    });

    this.GetMedicalFormula();
  }

  GetMedicalFormula(){
    this.medicalFormulaSvc.GetMedicalFormulasDetail(this.appointment_id)
                .subscribe({
                  error:(err:any) => {
                    console.log(err);
                  },
                  next:(resp:any) => {
                    this.specialty_name = resp[0].medical_specialty.license.specialty.name;
                    this.user_name = `${resp[0].user.first_name} ${resp[0].user.last_name}` ;
                    this.user_gender = `${resp[0].user.gender}` ;
                    this.user_document = `${resp[0].user.document}` ;
                    this.user_avatar = resp[0].user.avatar ;
                    this.service_date = resp[0].date;
                    console.log(this.user_avatar)

                    this.internal_notes = resp[0].anamnesis[0].internal_notes;
                    this.reason_for_consultation = resp[0].anamnesis[0].reason_for_consultation;
                    this.recommendations = resp[0].anamnesis[0].recommendations;
                    this.diagnosis = resp[0].anamnesis[0].diagnosis;
                    this.analysis_and_plan = resp[0].anamnesis[0].analysis_and_plan;
                    this.service_type = resp[0].anamnesis[0].observations;
                    this.Medicines = resp[0].vademecum;

                    this.start_date_inhability = resp[0].inability[0].start_date;
                    this.end_date_inhability = resp[0].inability[0].end_date;
                  }
                })
  }
}
