import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  public base_url:string =  environment.base_url;
  get header() {
    return {
      headers: {
        'authorization': `Bearer ${localStorage.getItem('net_token')}`
      }
    }
  }
  constructor(private http:HttpClient) { }

  GetAppoinmentsByStatus(status:string, date:string, limit:number, offset:number){
    const url = `${this.base_url}/appointment/medical/?status=${status}&date=${date}&offset=${offset}&limit=${limit}`;
    return this.http.get(url, this.header);
  };

  GetAppoinmentsAttended( limit:number, offset:number, search:string){
    const url = `${this.base_url}/appointment/medical/?status=Atendida&offset=${offset}&limit=${limit}&search=${search}`;
    return this.http.get(url, this.header);
  };

  GetAppointmentsAttendedByIntervall(start_date:string, end_date:string , offset:number, limit:number) {
    const url = `${this.base_url}/appointment/medical/?status=Atendida&start_date=${start_date}&end_date=${end_date}&offset=${offset}&limit=${limit}`;
    return this.http.get(url, this.header);
  };

  GetAppointmentByDate(date:string , limit:number, offset:number) {
    const url = `${this.base_url}/appointment/medical/?date=${date}&offset=${offset}&limit=${limit}`;
    return this.http.get(url, this.header);
  };

  GetAppointmentByIntervalleOfDate(start_date:string, end_date:string, limit:number, offset:number){
    const url = `${this.base_url}/appointment/medical/?start_date=${start_date}&end_date=${end_date}&offset=${offset}&limit=${limit}`;
    return this.http.get(url, this.header);
  };

  GetAppointmentById(id:string) {
    const url = `${this.base_url}/appointment/${id}/`;
    return this.http.get(url, this.header);
  };


  CompleteAppointment(data:{}, id:string){
    const url  = `${this.base_url}/appointment/${id}/`;
    return this.http.patch(url, data, this.header);
  };

  GetMedicalFormulasDetail(appointment_id:string){
    const url = `${this.base_url}/appointment/get_order/?appointment=${appointment_id}`;
    return this.http.get(url, this.header);
  };

  ValidateAppointmentCode(data:{}){
    const url = `${this.base_url}/appointment/validate_code/`;
    return this.http.post(url, data, this.header);
  };

  SendAidAndOrders(data:{}){
    const url = `${this.base_url}/aids-and-orders/`;
    return this.http.post(url, data, this.header);
  };


}
