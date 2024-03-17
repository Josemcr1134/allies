import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from '../../../services/appointments.service';
import { Router } from '@angular/router';
import { WalletService } from '../../../services/wallet.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-wallet',
  templateUrl: './my-wallet.component.html',
  styleUrls: ['./my-wallet.component.css']
})
export class MyWalletComponent implements OnInit {
  public start_date:string ='';
  public end_date:string = '';
  public DatesByIntervall:any[]=[];
  public offsetIntervall:number = 0;
  public pageIntervall:number = 0;
  public page:number = 1;

  public previousIntervall:any;
  public nextIntervall:any;
  public offsetOrder:number = 0;
  public pageOrder:number = 0;

  public previousOrder:any;
  public nextOrder:any;
  public limit:number = 15;
  public appointmentToCollect:any[] =[];
  public loading:boolean = false;
  public Orders:any[] = [];
  public AppointmentsCollected:any[] = [];
  constructor(private appointmentsSvc:AppointmentsService, private router:Router, private walletSvc:WalletService) { }

  ngOnInit(): void {
    this.GetWalletOrders();

  }

  GetAttendedAppointmentsByIntervall(){
    this.appointmentsSvc.GetAppointmentsAttendedByIntervall(this.start_date, this.end_date, this.offsetIntervall, this.limit)
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

  PaginationByOrder(value:number){
    this.pageOrder += value;

    if(this.pageOrder > 0){
      this.offsetOrder = (this.limit * this.pageOrder) -  this.limit;
    } else if(this.pageOrder <  1){
      this.pageOrder === 1;
    } else if(this.Orders.length === 0){
      this.offsetOrder = (this.limit * (this.page - 1)) -  this.limit;
    };
    this.GetWalletOrders();
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

  AddAppointmentToCollect(value:string){
    this.loading = !this.loading
    const d = value
    if (this.appointmentToCollect.find(ds => ds === d)) {
      this.appointmentToCollect.splice(this.appointmentToCollect.indexOf(d), 1);
    } else {
      this.appointmentToCollect.push({id:d});
    };
    this.loading = !this.loading
  };

  NewWalletOrder(){
    this.loading = !this.loading;

    const body = {
      appointment: this.appointmentToCollect
    };
      this.walletSvc.newWalletOrder(body)
              .subscribe({
                error:(err:any) => {
                  this.loading = !this.loading;
                  Swal.fire('Oooops', `${err.error.message}`, 'error');
                },
                next:(resp:any) => {
                  this.loading = !this.loading
                  Swal.fire('Éxito', `${resp.message}`, 'success');
                  this.GetAttendedAppointmentsByIntervall();
                  this.GetWalletOrders();
                  this.appointmentToCollect = [];
                }
              });
  };

  GetWalletOrders(){
    this.walletSvc.GetWalletOrders()
            .subscribe({
              error:(err:any) => {
                console.log(err);
              },
              next:(resp:any) => {
                this.Orders = resp.results;
                this.nextOrder = resp.next;
                this.previousOrder = resp.previous;
                console.log(this.Orders);
              }
            });
  };

  GetOrdersCollected(orders:[]){
    this.AppointmentsCollected = orders;
  };

  DeleteOrder(id:string){
    Swal.fire({
      title: '¿Estas seguro de eliminar esta orden?',
      text: "No podrás recuperarla!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
        if (result.isConfirmed) {
          this.walletSvc.DeleteOrder(id)
          .subscribe({
            error:(err:any) => {
              Swal.fire('Oooops', 'No pudimos eliminar esta orden', 'error');
              this.GetWalletOrders();
            },
            next:(resp:any) => {
              this.GetWalletOrders();
              Swal.fire('Éxito', `${resp.message}`, 'success');
            }
          })
        };
      });

  };

}
