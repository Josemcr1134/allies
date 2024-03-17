import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IndicatorsService {

  public base_url:string =  environment.base_url;
  get header() {
    return {
      headers: {
        'authorization': `Bearer ${localStorage.getItem('net_token')}`
      }
    }
  };

  constructor(private http:HttpClient) { }

  GetWelcomePanelIndicators(){
    const url = `${this.base_url}/indicator-ally/get_indicators/`;
    return this.http.get(url, this.header);
  }
}
