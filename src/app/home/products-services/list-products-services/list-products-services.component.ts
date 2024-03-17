import { Component, OnInit } from '@angular/core';
import { AllieServicesService } from 'src/app/services/allie-services.service';

@Component({
  selector: 'app-list-products-services',
  templateUrl: './list-products-services.component.html',
  styleUrls: ['./list-products-services.component.css']
})
export class ListProductsServicesComponent implements OnInit {
  public limit:number = 10;

  public offsetServicesRequest:number = 0;
  public offsetServicesAssigned:number = 0;

  public pageServicesRequest:number = 1;
  public pageServicesAssigned:number = 1;

  public nextServicesRequest:any;
  public nextServicesAssigned:any;

  public previousServiceAssigned:any;
  public previousServiceRequest:any;

  public RequestedServices:any[] = [];
  public AssignedServices:any[] = [];
  public searchTerm:string = ''
  constructor( private allieSvc:AllieServicesService) { }

  ngOnInit(): void {
    this.GetServicesRequested();
    this.GetAssignedServices();
  }

  GetServicesRequested(){
      this.allieSvc.GetUserRequestedServices(this.limit, this.offsetServicesRequest, this.searchTerm)
              .subscribe({
                error:(err:any) => {
                  console.log(err);
                },
                next:(resp:any) => {
                  this.nextServicesRequest = resp.next;
                  this.previousServiceRequest = resp.previous;
                  this.RequestedServices = resp.results;
                }
              });
  };

  GetAssignedServices(){
    this.allieSvc.GetAssignedServices(this.limit, this.offsetServicesAssigned, this.searchTerm)
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

  PaginationServicesRequested(value:number){
    this.pageServicesRequest += value;

    if(this.pageServicesRequest > 0){
      this.offsetServicesRequest = (this.limit * this.pageServicesRequest) -  this.limit;
    } else if(this.pageServicesRequest <  1){
      this.pageServicesRequest === 1;
    } else if(this.AssignedServices.length === 0){
      this.offsetServicesRequest = (this.limit * (this.pageServicesRequest - 1)) -  this.limit;
    };
    this.GetServicesRequested();
  };

  PaginationServicesAssigned(value:number){
    this.pageServicesAssigned += value;

    if(this.pageServicesAssigned > 0){
      this.offsetServicesAssigned = (this.limit * this.pageServicesAssigned) -  this.limit;
    } else if(this.pageServicesAssigned <  1){
      this.pageServicesAssigned === 1;
    } else if(this.AssignedServices.length === 0){
      this.offsetServicesAssigned = (this.limit * (this.pageServicesAssigned - 1)) -  this.limit;
    };
    this.GetAssignedServices();
  };

}
