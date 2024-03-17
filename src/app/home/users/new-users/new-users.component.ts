import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-users',
  templateUrl: './new-users.component.html',
  styleUrls: ['./new-users.component.css'],
})
export class NewUsersComponent implements OnInit {

  public username:string = '';
  public email:string = '';
  public first_name:string ='';
  public last_name:string = '';
  public gender:string = '';
  public doc_type:string = '';
  public document:string = '';
  public phone_number:string = '';
  public enable_code:string ='';
  public Doc_Types:any[] = [];
  public Gender:any[] = [];
  public emailStatus:boolean = true;
  constructor(private usersSvc: UsersService, private globalSvc:GlobalService ,private router: Router) {}

  ngOnInit(): void {
     this.GetDocTypes();
    this.GetGenders();
  }

  NewUser() {
    const body = {
      username: this.email,
      email: this.email,
      first_name: this.first_name,
      last_name: this.last_name,
      gender: this.gender,
      document_type: this.doc_type,
      document: this.document,
      phone_number: this.phone_number,
      enable_code: this.enable_code,
    };
    this.usersSvc.NewSubordinateUser(body)
              .subscribe({
                error:(err:any) => {
                  if (err.error.user.email[0]) {
                    Swal.fire('Oooops', 'Este email ya se encuentra registrado', 'error');
                  } else if(err.error.user.phone_number[0]){
                    Swal.fire('Oooops', 'Este celular ya se encuentra registrado', 'error');
                  } else if(err.error.user.document[0]){
                    Swal.fire('Oooops', 'Este número de documento ya se encuentra registrado', 'error');
                  } else {
                    Swal.fire('Oooops', 'No se ha podido crear usuario, revise que todos los campos del formulario esten diligenciados', 'error');
                  };
                },
                next:(resp:any) => {
                  Swal.fire('Éxito', 'Usuario creado correctamente', 'success');
                  this.router.navigateByUrl('/Home/Users/UserList')
                }
              })
  };

  GetDocTypes(){
    this.globalSvc.GetDocTypes()
          .subscribe({
            error:(err:any) => {
              console.log(err)
            },
            next:(resp:any) => {
              this.Doc_Types = resp.results;
            }
          });
  };

  GetGenders(){
    this.globalSvc.GetGenders()
            .subscribe({
              error:(err:any) =>{
                  console.log(err)
              },
              next:(resp:any) => {
                this.Gender = resp.results;
              }
            })
  };

  validarEmail() {
    return this.emailStatus = /^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(this.email);
  }
}
