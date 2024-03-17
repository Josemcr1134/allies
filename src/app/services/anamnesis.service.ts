import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnamnesisService {

  public base_url:string =  environment.base_url;
  get header() {
    return {
      headers: {
        'authorization': `Bearer ${localStorage.getItem('net_token')}`
      }
    }
  }
  constructor(private http:HttpClient) { }


  NewAnamnesis(data:{}){
    const url = `${this.base_url}/anamnesis/`;
    return this.http.post(url, data, this.header);
  };

  NewAnamnesisDoc(data:FormData){
    const url = `${this.base_url}/anamnesis-document/`;
    return this.http.post(url, data, this.header);
  };

}
