import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AgendaService } from 'src/app/services/agenda.service';
import { AllieServicesService } from 'src/app/services/allie-services.service';
import { LicensesService } from 'src/app/services/licenses.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-configs',
  templateUrl: './my-configs.component.html',
  styleUrls: ['./my-configs.component.css']
})
export class MyConfigsComponent implements OnInit {

  SpecialistType:number = 0;
  public limit:number = 10;
  public offset:number = 0;
  public page:number = 0;
  public Users:any[] = [];
  public next:any;
  public previous:any;
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

  constructor(private alliesSvc:AllieServicesService,private userSvc:UsersService, private activatedRoute:ActivatedRoute, private agendaSvc: AgendaService, public licenseSvc:LicensesService) { }

  ngOnInit(): void {
    this.platformService = localStorage.getItem('servicePlatform') || '';
    this.SpecialistType = Number(localStorage.getItem('user_type')) ;
    this.uid = localStorage.getItem('id') || '';
    this.fullname = localStorage.getItem('name') || '';
    console.log(this.platformService);
    this.GetSubordinateUsers();
    this.GetUserWeeklyAgenda();
    this.GetAvaibleDates();
    this.GetSubordinateLicenses();
    this.GetAssignedServices();
  };

  GetSubordinateUsers(){
    this.userSvc.GetUsers(this.limit, this.offset)
                .subscribe({
                  error:(err:any) => {
                    console.log(err);
                  },
                  next:(resp:any) => {
                    this.next = resp.next;
                    this.previous = resp.previous;
                    this.Users = resp.results;
                  }
                })
  };


  PaginationSubordinate(value:number){
    this.page += value;

    if(this.page > 0){
      this.offset = (this.limit * this.page) -  this.limit;
    } else if(this.page <  1){
      this.page === 1;
    } else if(this.Users.length === 0){
      this.offset = (this.limit * (this.page - 1)) -  this.limit;
    };
    this.GetSubordinateUsers();
  };




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
      list_days: this.Days,
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
                Swal.fire('Oooops', `Configuración de agendas Crear Agenda “ No se pudo crear la agenda, verifique que los campos se diligencien correctamente`, 'warning')
              },
              next:(resp:any) => {
                Swal.fire('Éxito', 'Se guardo correctamente la agenda', 'success');
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
