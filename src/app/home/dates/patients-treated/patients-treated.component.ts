import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from '../../../services/appointments.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patients-treated',
  templateUrl: './patients-treated.component.html',
  styleUrls: ['./patients-treated.component.css']
})
export class PatientsTreatedComponent implements OnInit {
  public date:any;
  public limit:number = 10;
  public offset:number = 0;
  public page:number = 1;
  public DatesByDate:any [] = [];
  public start_date:string ='';
  public end_date:string = '';
  public offsetIntervall:number = 0;
  public pageIntervall:number = 0;
  public DatesByIntervall:any[]=[];
  public previous:any;
  public next:any;
  public previousIntervall:any;
  public nextIntervall:any;

  constructor(private appointmentSvc:AppointmentsService, private router:Router) { }

  ngOnInit(): void {
    this.date = new Date();
    this.date = this.date.toISOString();
    this.date = this.date.slice(0,10);
    this.GetAppointmentsByDateAndStatus();
  };


  GetAppointmentsByDateAndStatus(){
    this.appointmentSvc.GetAppoinmentsByStatus('Atendida', this.date, this.limit, this.offset)
              .subscribe({
                error:(err:any) => {
                  console.log(err);
                },
                next:(resp:any) => {
                  this.DatesByDate = resp.results;
                  this.next = resp.next;
                  this.previous = resp.previos
                }
              });
  };

  PaginationByDay(value:number){
    this.page += value;

    if(this.page > 0){
      this.offset = (this.limit * this.page) -  this.limit;
    } else if(this.page <  1){
      this.page === 1;
    } else if(this.DatesByDate.length === 0){
      this.offset = (this.limit * (this.page - 1)) -  this.limit;
    };
    this.GetAppointmentsByDateAndStatus();
  };

  GetAttendedAppointmentsByIntervall(){
    this.appointmentSvc.GetAppointmentsAttendedByIntervall(this.start_date, this.end_date, this.offsetIntervall, this.limit)
              .subscribe({
                error:(err:any) => {
                  console.log(err);
                },
                next:(resp:any )=> {
                  this.DatesByIntervall = resp.results;
                  this.nextIntervall = resp.next;
                  this.previousIntervall = resp.previous
                }
              });
  };

  PaginationByIntervall(value:number){
    this.pageIntervall += value;

    if(this.pageIntervall > 0){
      this.offsetIntervall = (this.limit * this.pageIntervall) -  this.limit;
    } else if(this.pageIntervall <  1){
      this.pageIntervall === 1;
    } else if(this.DatesByIntervall.length === 0){
      this.offsetIntervall = (this.limit * (this.page - 1)) -  this.limit;
    };
    this.GetAttendedAppointmentsByIntervall();
  };

}
