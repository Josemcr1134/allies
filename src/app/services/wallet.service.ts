import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  public base_url:string =  environment.base_url;
  get header() {
    return {
      headers: {
        'authorization': `Bearer ${localStorage.getItem('net_token')}`
      }
    }
  }
  constructor(private http:HttpClient) { }

  newWalletOrder(data:{}){
    const url = `${this.base_url}/wallet/`;
    return this.http.post(url, data , this.header);
  };

  GetWalletOrders(){
    const url = `${this.base_url}/wallet/`;
    return this.http.get(url, this.header);
  };

  DeleteOrder(id:string){
    const url = `${this.base_url}/wallet/${id}/`;
    return this.http.delete(url, this.header);
  }

}
