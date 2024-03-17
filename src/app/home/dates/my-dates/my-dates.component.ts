import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from 'src/app/services/appointments.service';
import 'tw-elements';
import { Router } from '@angular/router';
import { IndicatorsService } from '../../../services/indicators.service';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { first } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-dates',
  templateUrl: './my-dates.component.html',
  styleUrls: ['./my-dates.component.css']
})
export class MyDatesComponent implements OnInit {
  public datesByDay:any;
  public limit:number = 10;
  public pageByDay:number = 1;
  public offsetByDay:number = 0;
  public next:any;
  public previous:any;
  public AppointmentsByDay:any[] =[];
  public user_type:number = 0;
  public start_date:string = '';
  public end_date:string = '';
  public pageByIntervalle:number = 1;
  public offsetByIntervalle:number = 0;
  public nextIntervalle:any;
  public previousIntervalle:any;
  public AppointmentsByIntervalle:any[] =[];
  public date:any;
  public scheduledAppointments:number = 0;
  public admittedAppointments:number = 0;
  public totalAppointment:number = 0;
  public totalPatiens:number = 0;
  public totalSold:number = 0;
  public totalAggendedToPay:number = 0;
  public code:string = '';
  public appointment_id:string = '';
  public first_name_user_date:string = '';
  public last_name_user_date:string = '';
  public gender_user_date:string = '';
  public code2:string = '';
  constructor(private appointmentsSvc:AppointmentsService, private router:Router, private indicatorsSvc:IndicatorsService) { }

  ngOnInit(): void {
    this.datesByDay = new Date();
    this.datesByDay = this.datesByDay.toISOString();
    this.datesByDay = this.datesByDay.slice(0,10)
    this.user_type = Number(localStorage.getItem('user_type'));
    this.date = new Date();
    this.date = this.date.toISOString();
    this.date = this.date.slice(0,10);
    this.GetIndicators();
    this.GetAppointmentsByDate();

  };

  GetAppointmentsByDate(){
    this.appointmentsSvc.GetAppointmentByDate(this.datesByDay, this.limit, this.offsetByDay)
                  .subscribe({
                    error:(err:any) => {
                      console.log(err);
                    },
                    next:(resp:any) => {
                      console.log(resp);
                      this.AppointmentsByDay = resp.results;
                      this.next = resp.next;
                      this.previous = resp.previous;
                    }
                  })
  };

  PaginationByDay(value:number){
    this.pageByDay += value;

    if(this.pageByDay > 0){
      this.offsetByDay = (this.limit * this.pageByDay) -  this.limit;
    } else if(this.pageByDay <  1){
      this.pageByDay === 1;
    } else if(this.AppointmentsByDay.length === 0){
      this.offsetByDay = (this.limit * (this.pageByDay - 1)) -  this.limit;
    };
    this.GetAppointmentsByDate();
  };


  GetAppointmentsByDatesInvtervalle(){
    this.appointmentsSvc.GetAppointmentByIntervalleOfDate(this.start_date, this.end_date, this.limit, this.offsetByIntervalle)
              .subscribe({
                error:(err:any) => {
                  console.log(err);
                },
                next:(resp:any) => {
                  this.AppointmentsByIntervalle = resp.results;
                  this.nextIntervalle = resp.next;
                  this.previousIntervalle = resp.previous;
                  console.log(resp)
                }
              });
  };

  PaginationByIntervalle(value:number){
    this.pageByIntervalle += value;

    if(this.pageByIntervalle > 0){
      this.offsetByIntervalle = (this.limit * this.pageByIntervalle) -  this.limit;
    } else if(this.pageByIntervalle <  1){
      this.pageByIntervalle === 1;
    } else if(this.AppointmentsByIntervalle.length === 0){
      this.offsetByIntervalle = (this.limit * (this.pageByIntervalle - 1)) -  this.limit;
    };
    this.GetAppointmentsByDatesInvtervalle();
  };

  GetIndicators(){
    this.indicatorsSvc.GetWelcomePanelIndicators()
              .subscribe({
                error:(err:any) => {
                  console.log(err);
                },
                next:(resp:any) => {
                  this.totalAppointment = resp.total_appointment;
                  this.totalPatiens = resp.total_patient;
                  this.scheduledAppointments = resp.scheduled_appointment;
                  this.totalSold = resp.total_attended;
                  this.totalAggendedToPay = resp.total_scheduled;
                }
              });
  };

  GetAppointmentData(appointment_id:string, code:string, first_name:string, last_name:string, gender:string){
    this.appointment_id = appointment_id;
    this.code = code.slice(0,4);
    this.first_name_user_date = first_name;
    this.last_name_user_date = last_name;
    this.gender_user_date = gender;
    console.log(this.code);
  };

  ValidateCodeToAppointment(){
     const body = {
        code:this.code2,
        appointment:this.appointment_id
     };

     this.appointmentsSvc.ValidateAppointmentCode(body)
            .subscribe({
              error:(err:any) => {
                console.log(err);
                Swal.fire('Oooops', 'Especialidad eliminada', 'error');
              },
              next:(resp:any) => {
                this.router.navigateByUrl(`/Home/Dates/MedicalRecordDescription/${this.appointment_id}`)
              }
            })
  }
}
