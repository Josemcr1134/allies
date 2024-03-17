import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LicensesService {

  public base_url:string =  environment.base_url;
  get header() {
    return {
      headers: {
        'authorization': `Bearer ${localStorage.getItem('net_token')}`
      }
    }
  }
  constructor(private http:HttpClient) { }

  NewMedicalSpecialty(data:{}){
    const url =  `${this.base_url}/medical-specialty/`;
    return this.http.post(url, data, this.header);
  }

  GetMedicalSpecialty(id:string) {
    const url = `${this.base_url}/medical-specialty/user/${id}`;
    return this.http.get(url, this.header);
  }
}
