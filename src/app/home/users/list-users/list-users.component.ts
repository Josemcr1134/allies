import { Component, OnInit } from '@angular/core';
import { AllieServicesService } from 'src/app/services/allie-services.service';
import { GlobalService } from 'src/app/services/global.service';
import { LicensesService } from 'src/app/services/licenses.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';
import 'tw-elements';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  public Users:any[] = [];
  public page:number = 1;
  public offset:number = 0;
  public limit:number = 15;
  public next:any;
  public previous:any;
  public NewLicenseModal:boolean = false;
  public LicenseModal:boolean = false;
  public specialtyID:string = '';
  public Specialties:any[] = [];
  public Licenses:any[] = [];
  public medical_id:any;
  public searchTerm:string = '';
  constructor(private usersSvc:UsersService, private globalSvc:GlobalService, public licenseSvc:LicensesService, private alliesServicesSvc:AllieServicesService) { }

  ngOnInit(): void {
    this.GetSubordinates();
    this.GetLicenses();
  }

  GetSubordinates(){
    this.usersSvc.GetUsers(this.limit, this.offset, this.searchTerm )
            .subscribe({
              error:(err:any) => {
                console.log(err);
              },
              next:(resp:any) => {
                this.Users = resp.results;
                this.next = resp.next;
                this.previous = resp.previous;
              }
            });
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
    this.GetSubordinates();
  };

  ShowNewLicenseModal(id:string){
    this.medical_id = id;
    this.NewLicenseModal = !this.NewLicenseModal;
  };

  ShowLicensesModal(id:string){
    this.medical_id = id;
    this.GetSubordinateLicenses();
    this.LicenseModal = !this.LicenseModal;
  };

  NewMedicalSpecialtie(){
    const body =  {
      license:this.specialtyID,
      medical:this.medical_id,
      is_active: true
    };
    this.licenseSvc.NewMedicalSpecialty(body)
          .subscribe({
            error:(err:any) => {
              console.log(err);
              Swal.fire('Oooops', 'No pudimos asignar esta licencia', 'error');
            },
            next:(resp:any) => {
              console.log(resp);
              Swal.fire('Éxito', 'Especialidad asociada exitosamente', 'success');
              this.NewLicenseModal = !this.NewLicenseModal;
              this.LicenseModal = !this.LicenseModal;
              this.GetSubordinateLicenses();
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
              }
            });
  };

  GetSubordinateLicenses(){
    this.licenseSvc.GetMedicalSpecialty(this.medical_id)
            .subscribe({
              error:(err:any) =>  {
                console.log(err)
              },
              next:(resp:any) => {
                console.log(resp)
                this.Licenses = resp.results;
              }
            })
  };

  ChangeStatus(is_active:boolean, license_id:string){
    const body =  {
      is_active: !is_active,

    };

    Swal.fire({
      title: '¿Estas seguro de actualizar esta licencia?',
      text: "Luego tienes la posibilidad de cambiarlo nuevamente!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, actualizar!'
    }).then((result) => {
        if (result.isConfirmed) {
          this.alliesServicesSvc.ChangeStatusSubordinateLicense(license_id, body)
              .subscribe({
                error:(err:any) => {
                  console.log(err);
                  Swal.fire('Oooops', 'No pudimos actualizar esta licencia', 'error');
                },
                next:(resp:any) => {
                  console.log(resp);
                  Swal.fire('Éxito', 'Especialidad desactivada', 'success');
                  this.GetSubordinateLicenses();
                }
              });
        };
      });
  };

  DeleteMedicalSpecialty(license_id:string){

    Swal.fire({
      title: '¿Estas seguro de actualizar esta licencia?',
      text: "Luego tienes la posibilidad de cambiarlo nuevamente!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, actualizar!'
    }).then((result) => {
        if (result.isConfirmed) {
          this.alliesServicesSvc.DeleteSubordinateLicense(license_id)
              .subscribe({
                error:(err:any) => {
                  console.log(err);
                  Swal.fire('Oooops', 'No pudimos eliminar esta licencia', 'error');
                },
                next:(resp:any) => {
                  console.log(resp);
                  Swal.fire('Éxito', 'Especialidad eliminada', 'success');
                  this.GetSubordinateLicenses();
                }
              });

        };
      });

  };

  ChangeUserStatus(status:string , uid:string){
    const body  = {
      status:status
    };
    Swal.fire({
      title: '¿Estas seguro de actualizar esta usuario?',
      text: "Luego tienes la posibilidad de cambiarlo nuevamente!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, actualizar!'
    }).then((result) => {
        if (result.isConfirmed) {
          this.usersSvc.ChangeSubordinateStatus(uid, body)
          .subscribe({
            error:(err:any) => {
              console.log(err);
              Swal.fire('Oooops', 'No pudimos actualizar este usuario', 'error');
            },
            next:(resp:any) => {
              console.log(resp);
              Swal.fire('Éxito', 'Usuario actualizado', 'success');
              this.GetSubordinates();
            }
          });
        };
      });
  };




}
