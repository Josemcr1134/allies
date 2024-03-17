import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AllieServicesService {

  public base_url:string =  environment.base_url;
  get header() {
    return {
      headers: {
        'authorization': `Bearer ${localStorage.getItem('net_token')}`
      }
    }
  }
  constructor(private http:HttpClient) { }


  GetUserRequestedServices(limit:number, offset:number, search:string){
    const url = `${this.base_url}/service-request/me/?limit=${limit}&offset=${offset}&search=${search}`;
    return this.http.get(url, this.header);
  };

  GetUserRequestService(id:string){
    const url = `${this.base_url}/service-request/${id}/`;
    return this.http.get(url, this.header);
  }

  RequestNewService(data:FormData){
    const url = `${this.base_url}/service-request/`;
    return this.http.post(url, data, this.header);
  };

  ChangeStatusRequestService(id:string, data:{}){
    const url = `${this.base_url}/service-request/${id}/`;
    return this.http.put(url, data, this.header);
  };

  ChangeStatusSubordinateLicense(id:string , data:{}){
    const url = `${this.base_url}/medical-specialty/${id}/`;
    return this.http.patch(url, data, this.header);
  };

  DeleteSubordinateLicense(id:string){
    const url = `${this.base_url}/medical-specialty/${id}/`;
    return this.http.delete(url, this.header);
  };

  GetAssignedServices(limit:number, offset:number, search:string = ''){
    const url = `${this.base_url}/ally-fee/me/?limit=${limit}&offset=${offset}&search=${search}`;
    return this.http.get(url, this.header);
  };


  GetServicesByType(type:string){
    const url = `${this.base_url}/service/?service_type_id=${type}`;
    return this.http.get(url, this.header);
  };


  GetServiceTypes(){
    const url = `${this.base_url}/service-type/`;
    return this.http.get(url, this.header);
  };




}
