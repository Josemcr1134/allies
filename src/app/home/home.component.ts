import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public chargeDocumentStatus:number = 0;
  public SpecialistType:number = 0;
  public rut:File| any;
  public chamber_of_commerce:File| any;
  public document:File| any;
  public logo:File| any;
  public signature_image:File| any;
  Rut: File[] = [];
  Chamber_of_commerce: File[] = [];
  Document: File[] = [];
  Logo: File[] = [];
  Signature_image: File[] = [];
  public counter:number = 0;
  constructor(private router:Router, private authSvc:AuthService) { }

  ngOnInit(): void {
    this.SpecialistType = Number(localStorage.getItem('user_type'));
    if(this.SpecialistType === 3 && localStorage.getItem('first') === null){
      this.router.navigateByUrl('/Home/Dates/AllDates');
      localStorage.setItem('first', 'ok' )
    }

    if (localStorage.getItem('status') === 'pre-registered') {
      this.chargeDocumentStatus = 1;
    } else {
      this.chargeDocumentStatus = 0;
    }
    console.log(this.SpecialistType)
  };


  Next(value:number) {
    this.chargeDocumentStatus = value;
  };


  ChargeAllieFiles(){
    const fd = new FormData();

    fd.append('rut', this.rut);
    fd.append('chamber_of_commerce', this.chamber_of_commerce);
    fd.append('document', this.document);
    fd.append('logo', this.logo);
    fd.append('signature_image', this.signature_image);

    this.authSvc.ChargeAlliesFiles(fd)
            .subscribe({
              error:(err:any) => {
                console.log(err);
                Swal.fire('Oooops', 'No pudimos subir estos archivos, revisalos y vuelve a intentarlo', 'error');
              },
              next:(resp:any) => {
                Swal.fire('Éxito', 'Documentos cargados satisfactoriamente', 'success');
                this.router.navigateByUrl('');
                console.log(resp);
                this.chargeDocumentStatus = 0;
              }
            });
  };


  onSelectSignatureImage(event:any) {
    this.Signature_image.push(...event.addedFiles);
    this.signature_image = this.Signature_image[0]
  };

  onRemoveSignatureImage(event:any) {
    this.Signature_image.splice(this.Signature_image.indexOf(event), 1);
  };

  onSelectRut(event:any) {
    this.Rut.push(...event.addedFiles);
    this.rut = this.Rut[0]
  };

  onRemoveRut(event:any) {
    this.Rut.splice(this.Rut.indexOf(event), 1);
  };


  onSelectChamberOfComerce(event:any) {
    this.Chamber_of_commerce.push(...event.addedFiles);
    this.chamber_of_commerce = this.Chamber_of_commerce[0]
  };

  onRemoveChamberOfComerce(event:any) {
    this.Chamber_of_commerce.splice(this.Chamber_of_commerce.indexOf(event), 1);
  };

  onSelectDocument(event:any) {
    this.Document.push(...event.addedFiles);
    this.document = this.Document[0]
  };

  onRemoveDocument(event:any) {
    this.Document.splice(this.Document.indexOf(event), 1);
  };

  onSelectLogo(event:any) {
    this.Logo.push(...event.addedFiles);
    this.logo = this.Logo[0]
  };

  onRemoveLogo(event:any) {
    this.Logo.splice(this.Logo.indexOf(event), 1);
  };

}
