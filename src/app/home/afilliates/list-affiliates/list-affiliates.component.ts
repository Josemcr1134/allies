import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from 'src/app/services/appointments.service';

@Component({
  selector: 'app-list-affiliates',
  templateUrl: './list-affiliates.component.html',
  styleUrls: ['./list-affiliates.component.css']
})
export class ListAffiliatesComponent implements OnInit {
  public Affiliates:any[] = [];
  public next:any;
  public previous:any;
  public page:number = 1;
  public offset:number = 0;
  public limit:number = 15;
  public searchTerm:string ='';
  constructor(private appointmentSvc:AppointmentsService) { }

  ngOnInit(): void {
    this.GetAffiliates();
  }

  GetAffiliates(){
    this.appointmentSvc.GetAppoinmentsAttended(this.limit,this.offset, this.searchTerm)
              .subscribe({
                error:(err:any) => {
                  console.log(err);
                },
                next:(resp:any) => {
                  this.Affiliates = resp.results;
                  this.next = resp.next;
                  this.previous = resp.previous;

                }
              });

  }

  PaginationDates(value:number){
    this.page += value;

    if(this.page > 0){
      this.offset = (this.limit * this.page) -  this.limit;
    } else if(this.page <  1){
      this.page === 1;
    } else if(this.Affiliates.length === 0){
      this.offset = (this.limit * (this.page - 1)) -  this.limit;
    };
    this.GetAffiliates();
  };

}
