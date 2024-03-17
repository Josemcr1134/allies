import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VademecumService {

  public base_url:string =  environment.base_url;
  get header() {
    return {
      headers: {
        'authorization': `Bearer ${localStorage.getItem('net_token')}`
      }
    }
  }
  constructor(private http:HttpClient) { }


  GetVademecums(){
    const url = `${this.base_url}/medicine/`;
    return this.http.get(url, this.header);
  };

  SendVademecumsForAppointment(data:any) {
    const url = `${this.base_url}/appointment-vademecum/`;
    return this.http.post(url, data,this.header);
  };

  GetCIE10(limit:number, offset:number){
    const url = `${this.base_url}/cie-10/?limit=${limit}&offset=${offset}`;
    return this.http.get(url, this.header);
  };

  GetUnitMeasure(limit:number, offset:number){
    const url =`${this.base_url}/unit-measure/?limit=${limit}&offset=${offset}`;
    return this.http.get(url, this.header);
  };

  GetTimeMeasure(limit:number, offset:number){
    const url = `${this.base_url}/time-measure/?limit=${limit}&offset=${offset}`;
    return this.http.get(url, this.header);
  };

  GetPeriodMeasure(limit:number, offset:number){
    const url = `${this.base_url}/period-measure/?limit=${limit}&offset=${offset}`;
    return this.http.get(url, this.header);
  };

  GetViaMeasure(limit:number, offset:number){
    const url = `${this.base_url}/via-measure/?limit=${limit}&offset=${offset}`;
    return this.http.get(url, this.header);
  };

  GetLaterality(limit:number, offset:number){
    const url = `${this.base_url}/laterality/?limit=${limit}&offset=${offset}`;
    return this.http.get(url, this.header);
  };


}
