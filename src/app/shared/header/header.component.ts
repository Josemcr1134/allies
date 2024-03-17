import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public base_url:string = environment.base_url;
  public userMenu:boolean = false;
  public showMenu:boolean = false;
  public username:string = '';
  public changePassword:boolean = false;
  public samePassword:boolean = true;
  public password:string = '';
  public password2:string = '';
  public changeLogo:boolean = false;
  public avatarPath:any;
  public Avatar :any []=[];
  SpecialistType:number = 0;


  constructor(private authSvc:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.SpecialistType = Number(localStorage.getItem('user_type')) ;

    this.username = localStorage.getItem('name') || '';
    this.avatarPath = localStorage.getItem('avatar') ;
    console.log(this.avatarPath.length)
  }

  showUserMenu(){
    this.userMenu = !this.userMenu;
  };

  showMobileMenu(){
    this.showMenu  = !this.showMenu;
  };
  ShowChangePasswordModal(){
    this.changePassword = !this.changePassword;
  };
  ShowChangeLogoModal(){
    this.changeLogo = !this.changeLogo;
  };

  VerifySamePasswords(){
    if (this.password === this.password2) {
        return this.samePassword = true;
    } else {
      return this.samePassword = false;
    };
  };

  ChangePassword(){
    const body = {
      new_password1: this.password,
      new_password2: this.password2
    };

    this.authSvc.ChangePassword(body)
      .subscribe({
        error:(err:any) => {
          Swal.fire('Oooops', 'La contraseña no cumple con los criterios de seguridad, intente escribir una nueva contraseña', 'error');
        },
        next:(resp:any) => {
          Swal.fire('Éxito', 'Contraseña creada correctamente', 'success');
          this.changePassword = !this.changePassword;
          this.password = '';
          this.password2 = '';
        }
      });
    };

  onSelectAvatar(event:any) {
    this.Avatar.push(...event.addedFiles);
  };

  onRemoveAvatar(event:any) {
    this.Avatar.splice(this.Avatar.indexOf(event), 1);
  };

  chargeAvatar(){
    const ac = new FormData();
    ac.append('avatar', this.Avatar[0]);
    this.authSvc.ChargeAvatar(ac)
    .subscribe({
      error:(err:any) => {
        Swal.fire('Oooops', 'No pudimos subir este Avatar, revísalo y vuelve a intentarlo', 'error');
      },
      next:(resp:any) => {
        Swal.fire('Éxito', 'Avatar Actualizado Correctamente', 'success');
        this.avatarPath = resp.avatar;
        localStorage.setItem('avatar', resp.avatar);
        this.changeLogo = !this.changeLogo;
      }
    })
  }
}
