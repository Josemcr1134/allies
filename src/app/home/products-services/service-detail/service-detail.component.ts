import { createNgModule } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AllieServicesService } from '../../../services/allie-services.service';
import { GlobalService } from '../../../services/global.service';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.css']
})
export class ServiceDetailComponent implements OnInit {
  public service_id:string = '';
  public service_name:string = '';
  public service_description:string = '';
  public service_specialty:string = '';
  public service_fee:any = 0 ;
  public service_netcare_fee:any = 0;
  public service_external_fee:any = 0; 
  public image:string = '';
  public Comments:any [] = [];
  public Specialties:any [] = [];
  files: File[] = [];
  public new_comment:string = '';
  public specialt_selected:string = '';
  public prev_data:any [] = [];

  constructor(private allieSvc:AllieServicesService, private router:Router,  private activatedRoute:ActivatedRoute, private globalSvc:GlobalService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id,  action}) => {
      this.service_id = id;
    });
    this.GetLicenses();
  }

  GetServiceRequest(){
    this.allieSvc.GetUserRequestService(this.service_id)
                .subscribe({
                  error:(err:any) => { 
                    console.log(err);
                  }, 
                  next:(resp:any) => {
                    console.log(resp);
                    this.service_name = resp.name;
                    this.service_description = resp.description;
                    this.service_fee = resp.fee;
                    this.service_external_fee = resp.external_fee;
                    this.service_netcare_fee = resp.netcare_fee;
                    this.image = resp.image;
                    this.Comments = resp.comments;
                    this.service_specialty = resp.specialty;
                    this.prev_data = resp.prev_data;
                    this.service_specialty = resp.specialty;
                  }
                });
  };

  SendServicesCorrections(){

    const fd = new FormData();

    fd.append('name', this.service_name);
    fd.append('description', this.service_description);
    fd.append('fee', this.service_fee);
    fd.append('external_fee', this.service_external_fee);
    fd.append('specialty', this.specialt_selected || this.service_specialty )
    fd.append('status', 'new');
    fd.append('comment', this.new_comment);
    fd.append('status', 'corrected');

    this.allieSvc.ChangeStatusRequestService(this.service_id, fd)
              .subscribe({
                error:(err:any) =>  { 
                  console.log(err, this.specialt_selected);
                  Swal.fire('Oooops', 'No pudimos corregir', 'error');
                }, 
                next:(resp:any) =>{ 
                  console.log(resp);
                  Swal.fire('Éxito', 'Correcciones enviadas', 'success');
                  this.router.navigateByUrl('/Home/Products&Services/ListP&S');

                }
              });
  };


  
  GetLicenses(){
    this.globalSvc.GetAssignedSpecialties()
            .subscribe({
              error:(err:any) => {
                console.log(err);
              }, 
              next:(resp:any) => { 
               this.Specialties = resp.results;
                console.log(this.Specialties);
                this.GetServiceRequest();

              }
            });
  };

  onSelect(event:any) {
    console.log(event);
    if (this.files.length > 1) {
      this.files = [];
      this.files.push(...event.addedFiles);
    } else if (this.files.length === 0) {
      this.files.push(...event.addedFiles);

    }
  };
  
  onRemove(event:any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  };

  


}
