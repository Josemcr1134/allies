import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DiscountsService } from '../../../services/discounts.service';
import { AllieServicesService } from '../../../services/allie-services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-apply-discount',
  templateUrl: './apply-discount.component.html',
  styleUrls: ['./apply-discount.component.css']
})
export class ApplyDiscountComponent implements OnInit {
  public percentage:number = 0;
  public start_date:string = '';
  public end_date:string = '';
  public ally_fee:string = '';
  public status:string = 'new';
  public AllyFees:any[] = [];
  public service_name:string = '';
  public service_description:string = ''; 
  public service_image:string = '';
  public service_fee:number = 0;
  public show_service:boolean = false;
  public service:any;
  constructor(private router:Router, private discountsSvc:DiscountsService, private allieSvc:AllieServicesService) { }

  ngOnInit(): void {
    this.GetAllyFee();
  };

  GetAllyFee(){
    this.allieSvc.GetAssignedServices(1000, 0)
              .subscribe({
                error:(err:any) => { 
                  console.log(err);
                }, 
                next:(resp:any) => { 
                  this.AllyFees = resp.results;
                }
              })
  };

  GetService(){
    console.log(this.service);
    this.service_name = this.service.service.name
    this.service_description = this.service.service.description
    this.service_image = this.service.service.image ;
    this.ally_fee = this.service.id;
    this.service_fee = this.service.fee;
    this.show_service = true;
  };

  NewDiscount(){
    
    const body = { 
     percentage: this.percentage,
     start_date: this.start_date.replace('T', ' ') + ':00',
     end_date: this.end_date.replace('T', ' ') + ':00',
     ally_fee:this.ally_fee,
     status:'new'
    };

    console.log(body)

    this.discountsSvc.NewDiscount(body)
          .subscribe({
            error:(err:any) => { 
              console.log(err, body);
              Swal.fire('Oooops', err.error[0], 'error');
            },
            next:(resp:any) => { 
              console.log(resp);
              Swal.fire('Éxito', 'Descuento enviado a administrador', 'success');
              this.router.navigateByUrl('/Home/Discounts/ListDiscounts');
            }
          })
  }

}
