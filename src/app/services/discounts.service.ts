import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DiscountsService {
  public base_url:string =  environment.base_url;
  get header() {
    return {
      headers: {
        'authorization': `Bearer ${localStorage.getItem('net_token')}`
      }
    }
  }
  constructor(private http:HttpClient) { }


  GetAllieDiscounts(limit:number, offset:number, searchTerm:string){
    const url = `${this.base_url}/discount/me/?limit=${limit}&offset=${offset}&search=${searchTerm}`;
    return this.http.get(url, this.header);
  };

  NewDiscount(data:{}){
    const url = `${this.base_url}/discount/`;
    return this.http.post(url, data, this.header);
  };


}
