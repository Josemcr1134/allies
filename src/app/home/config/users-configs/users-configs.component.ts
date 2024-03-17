import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { AgendaService } from '../../../services/agenda.service';
import { LicensesService } from '../../../services/licenses.service';
import { AllieServicesService } from '../../../services/allie-services.service';

@Component({
  selector: 'app-users-configs',
  templateUrl: './users-configs.component.html',
  styleUrls: ['./users-configs.component.css']
})
export class UsersConfigsComponent implements OnInit {
  public uid:string = '';
  public fullname:string ='';
  public showNewWeeklyModal:boolean = false;
  public isTelemedicine:boolean = true;
  public day:number = 0;
  public duration:number = 0;
  public events:number = 0;
  public start_time:string = '';
  public end_time:string = '';
  public monday:any;
  public tuesday:any;
  public wednesday:any;
  public thursday:any;
  public friday:any;
  public saturday:any;
  public sunday:any;
  public Licenses:any [] = [];
  public Agendas:any [] =[];
  public limit:number = 10;
  public offsetServicesAssigned:number = 0;
  public pageServicesAssigned:number = 1;
  public nextServicesAssigned:any;
  public previousServiceAssigned:any;
  public AssignedServices:any[] = [];
  public serviceSelected:string = '';
  public Days:any[] = [];
  public Events:any[] = [];
  public eventOffset:number = 0;
  public eventPage:number = 1;
  public eventNext:any;
  public eventPrevious:any;
  public showEvents:boolean = false;
  public platformService:string = '';
  constructor(private activatedRoute:ActivatedRoute, private agendaSvc: AgendaService, public licenseSvc:LicensesService, private alliesSvc:AllieServicesService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id,  name}) => {
      this.uid = id;
      this.fullname = name;
    });
    this.platformService = localStorage.getItem('servicePlatform') || '';
    this.GetUserWeeklyAgenda();
    this.GetAvaibleDates();
    this.GetSubordinateLicenses();
    this.GetAssignedServices();
    console.log(this.platformService)
  }

  GetUserWeeklyAgenda(){
    this.agendaSvc.GetMedicalWeeklyProgram(this.uid)
              .subscribe({
                error:(err:any) => {
                  console.log(err);
                },
                next:(resp:any) => {
                  this.Agendas = resp.results;
                }
              })
  };

  GetAvaibleDates(){
    this.agendaSvc.GetWeeklyProgramAvaiblesDates()
              .subscribe({
                error:(err:any) => {
                  console.log(err);
                },
                next:(resp:any) => {
                  this.monday = resp.Monday;
                  this.tuesday = resp.Tuesday;
                  this.wednesday = resp.Wednesday;
                  this.thursday = resp.Thursday;
                  this.friday = resp.Friday;
                  this.saturday = resp.Saturday;
                  this.sunday = resp.Sunday;
                }
              })
  };

  GetSubordinateLicenses(){
    this.licenseSvc.GetMedicalSpecialty(this.uid)
            .subscribe({
              error:(err:any) =>  {
                console.log(err)
              },
              next:(resp:any) => {
                this.Licenses = resp.results;
              }
            })
  };

  NewDailyAgenda(){
    const body = {
      // Number(this.day)
      list_days: this.Days ,
      events: this.events,
      start_time: `${this.start_time}:00`,
      duration: this.duration,
      is_telemedicine:this.isTelemedicine,
      user: Number(this.uid),
      service:this.serviceSelected
      // end_time: this.end_time,
    };

    this.agendaSvc.NewWeeklyProgram(body)
            .subscribe({
              error:(err:any) => {
                console.log(err, body);

                Swal.fire('Oooops', `No pudimos crear estos eventos, revisa que no tengas horarios que choquen con este`, 'warning')
              },
              next:(resp:any) => {
                Swal.fire('Éxito', 'Agenda del dia guardada', 'success');
                this.GetUserWeeklyAgenda();
                this.showNewWeeklyModal = !this.showNewWeeklyModal;
              }
            })
  };

  ShowModal(){
    this.showNewWeeklyModal = !this.showNewWeeklyModal;
  };

  GetAssignedServices(){
    this.alliesSvc.GetAssignedServices(this.limit, this.offsetServicesAssigned)
          .subscribe({
            error:(err:any) => {
              console.log(err);
            },
            next:(resp:any) => {
              this.nextServicesAssigned = resp.next;
              this.previousServiceAssigned = resp.previous;
              this.AssignedServices = resp.results;
            }
          });
  };

  AddDay(value:number){

    const d = value
    if (this.Days.find(ds => ds === d)) {
      this.Days.splice(this.Days.indexOf(d), 1);
    } else {
      this.Days.push(d);
    };
  };

  GetWeeklyEvents(day:number){
    this.day = day
      this.agendaSvc.GetAgendaEventes(this.uid, this.limit, this.eventOffset, day)
                .subscribe({
                  error:(err:any) => {
                    console.log(err);
                  },
                  next:(resp:any) => {
                    this.Events = resp.results;
                    this.eventNext = resp.next;
                    this.eventPrevious = resp.previous;
                    this.showEvents = !this.showEvents;
                  }
                });
  };

  PaginationEvents(value:number){
    this.eventPage += value;

    if(this.eventPage > 0){
      this.eventOffset = (this.limit * this.eventPage) -  this.limit;
    } else if(this.eventPage <  1){
      this.eventPage === 1;
    } else if(this.Events.length === 0){
      this.eventOffset = (this.limit * (this.eventPage - 1)) -  this.limit;
    };
    this.GetWeeklyEvents(this.day);
  };

  UpdateEventStatus(id:string){
    const body =  {
      status:"RESERVED"
    };

    this.agendaSvc.ChangeEventStatus(id, body)
            .subscribe({
              error:(err:any) => {
                Swal.fire('Oooops', 'No pudimos deshabilitar este cupo', 'error');
              },
              next:(resp:any) => {
                Swal.fire('Éxito', 'Cupo deshabilitado', 'success');
                this.GetWeeklyEvents(this.day);
              }
            });
  };

}
