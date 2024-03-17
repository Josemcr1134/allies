import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  public email:string = '';
  public emailStatus:boolean = true;
  constructor(private authSvc:AuthService) { }

  ngOnInit(): void {
  }

  SendEmailCode(){
    const body = {
      email:this.email
    }
    this.authSvc.ResetPassword(body)
          .subscribe({
            error:(err:any) => {
              console.log(err, body);
              Swal.fire('Oooops', 'Tenemos un problema enviando tu correo', 'error');
              this.email = '';
            },
            next:(resp:any) => {
              console.log(resp);
              Swal.fire('Éxito', resp.detail, 'success');
              this.email = '';
            }
          });
  };

  validarEmail() {
    return this.emailStatus = /^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(this.email);
  }

}
