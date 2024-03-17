import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllieServicesService } from 'src/app/services/allie-services.service';
import { GlobalService } from 'src/app/services/global.service';
import Swal from 'sweetalert2';


interface comment { 
  text:string
}

@Component({
  selector: 'app-news-services',
  templateUrl: './news-services.component.html',
  styleUrls: ['./news-services.component.css']
})
export class NewsServicesComponent implements OnInit {
  public service_name:string = '';
  public service_desc:string = '';
  public service_fee:any = 0;
  public service_external_fee:any = 0;
  public service_image:File | any;
  public specialty:string = '';
  public service_comment:string = '';
  public Comments:comment[] = [ 
    {
      text:this.service_comment
    }
  ]
  public Specialties:any[] = [];
  files: File[] = [];

  constructor(private alliesSvc:AllieServicesService, private globalSvc:GlobalService,private router:Router) { }

  ngOnInit(): void {
    this.GetLicenses();
  }

  NewServiceRequest(){
    const fd = new FormData();
    fd.append('name', this.service_name);
    fd.append('description', this.service_desc);
    fd.append('fee', this.service_fee);
    fd.append('status', 'new');
    fd.append('external_fee', this.service_external_fee);
    fd.append('ally', localStorage.getItem('id') || '');
    fd.append('admin', localStorage.getItem('id') || '');
    fd.append('specialty', this.specialty);
    fd.append('comment', this.service_comment);
    fd.append('image', this.files[0]);
    this.alliesSvc.RequestNewService(fd)
            .subscribe({
              error:(err:any) => { 
                console.log(err);
                Swal.fire('Ooooops', 'No pudimos generar esta solicitud','error');
              }, 
              next:(resp:any) => {
                console.log(resp);
                Swal.fire('Éxito', 'Solicitud de servicio creada, espera respuesta de netcare', 'success');
                this.router.navigateByUrl('/Home/Products&Services/ListP&S');
                
              }
            })

  }


  GetLicenses(){
    this.globalSvc.GetAssignedSpecialties()
            .subscribe({
              error:(err:any) => {
                console.log(err);
              }, 
              next:(resp:any) => { 
               this.Specialties = resp.results;
                console.log(this.Specialties);
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
