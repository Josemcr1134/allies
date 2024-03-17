import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from '../../services/appointments.service';
import { IndicatorsService } from '../../services/indicators.service';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements OnInit {
  // STATUS
  // RESERVED
  // SCHEDULED
  // ADMITTED
  // ATTENDED
  // CANCELLED
  public username:string = '';
  public avatarPath:string ='';
  public date:any;
  public status:string = 'Agendada';
  public Dates:any [] = [];
  public page:number = 1;
  public offset:number = 0;
  public limit:number = 5;
  public next:any;
  public previous:any;
  public attendedAppointments:number = 0;
  public canceledAppointments:number = 0;
  public scheduledAppointments:number = 0;
  public admittedAppointments:number = 0;
  public totalAppointment:number = 0;
  public totalPatiens:number = 0;
    constructor(private appointmentSvc:AppointmentsService, private indicatorsSvc:IndicatorsService) { }

  ngOnInit(): void {
    this.username = localStorage.getItem('name') || '';
    this.avatarPath = localStorage.getItem('avatar') ||'';
    this.date = new Date();
    this.date = this.date.toISOString();
    this.date = this.date.slice(0,10);

    this.GetIndicators();
    this.GetAppointmentByStatus(this.status);
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
                  this.attendedAppointments = resp.attended_appointment;
                  this.canceledAppointments = resp.cancelled_appointment;
                  this.scheduledAppointments = resp.scheduled_appointment;
                  this.admittedAppointments = resp.admitted_appointment;
                  console.log(resp)
                }
              });
  };

  GetAppointmentByStatus(status:string){
    this.status = status;
    this.appointmentSvc.GetAppoinmentsByStatus(this.status, this.date, this.limit, this.offset)
                  .subscribe({
                    error:(err:any) => {
                      console.log(err);
                    },
                    next:(resp:any) => {
                      this.Dates = resp.results;
                      this.next = resp.next;
                      this.previous = resp.previous;
                    }
                  });
  };

  PaginationDates(value:number){
    this.page += value;

    if(this.page > 0){
      this.offset = (this.limit * this.page) -  this.limit;
    } else if(this.page <  1){
      this.page === 1;
    } else if(this.Dates.length === 0){
      this.offset = (this.limit * (this.page - 1)) -  this.limit;
    };
    this.GetAppointmentByStatus(this.status);
  };

}
