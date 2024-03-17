import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public base_url:string =  environment.base_url;
  get header() {
    return {
      headers: {
        'authorization': `Bearer ${localStorage.getItem('net_token')}`
      }
    }
  }
  constructor(private http:HttpClient) { }

  GetGenders(){
    const url = `${this.base_url}/gender/`;
    return this.http.get(url, this.header);
  };

  GetDocTypes(){
    const url = `${this.base_url}/document-type/`;
    return this.http.get(url, this.header);
  }; 

  GetAssignedSpecialties(){
    const url = `${this.base_url}/license-specialty/me/`;
    return this.http.get(url, this.header);
  }
  
}
