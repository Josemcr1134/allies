import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public password: string = '';
  public email: string = '';
  public SpecialistType: number = 0;
  public emailStatus:boolean = true;

  constructor(private router: Router, private authSvc: AuthService) {}

  ngOnInit(): void {
    localStorage.clear();
  }

  login() {
    const body = {
      username: this.email,
      email: this.email,
      password: this.password,
    };
    this.authSvc.login(body).subscribe({
      error: (err: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Ooooops...',
          text: 'Usuario o contraseña con incorrectos',
        });
      },
      next: (resp: any) => {
        console.log(resp)
        if (resp.user.status === "files-sent") {
          localStorage.clear();
          this.router.navigateByUrl('');
          Swal.fire('Espera...', 'Tu cuenta se encuentra pendiente de aprobación', 'warning');
        } else if (resp.user.status === 'disabled') {
          localStorage.clear();
          this.router.navigateByUrl('');
          Swal.fire('Oooops...', 'Tu cuenta se encuentra deshabilitada', 'warning');

        } else {
          if (resp.user.user_type === 2 || resp.user.user_type === 4 ) {
            localStorage.setItem('servicePlatform',resp.user.service_platform.id);

          }
          if (resp.user.user_type === 3 || resp.user.user_type === 4) {
            localStorage.setItem('name',  `${resp.user.first_name}  ${resp.user.last_name}`);


          } else if(resp.user.user_type === 2){
            localStorage.setItem('name', resp.user.company_set.name );

          }
          if (resp.user.user_type === 4 || resp.user.user_type === 2 || resp.user.user_type === 3  ){
            localStorage.setItem('net_token', resp.token);
            localStorage.setItem('user_type', resp.user.user_type);
            localStorage.setItem('id', resp.user.id );
            localStorage.setItem('status',resp.user.status);
            localStorage.setItem('avatar',resp.user.avatar);
            this.router.navigateByUrl('/Home');
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Ooooops...',
              text: 'No puedes acceder',
            });
            localStorage.clear();
          };

        };
      },
    });
  };

  validarEmail() {
    return this.emailStatus = /^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(this.email);
  };
}
