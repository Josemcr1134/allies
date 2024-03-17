import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  public base_url:string =  environment.base_url;
  get header() {
    return {
      headers: {
        'authorization': `Bearer ${localStorage.getItem('net_token')}`
      }
    }
  }
  constructor(private http:HttpClient) { }

  NewWeeklyProgram(data:{}){
    const url = `${this.base_url}/weekly/weekly_program/`;
    return this.http.post(url, data, this.header);
  };


  GetMedicalWeeklyProgram(uid:string){
    const url = `${this.base_url}/weekly-program-list/?user_id=${uid}`;
    return this.http.get(url, this.header);
  };

  GetWeeklyProgramAvaiblesDates(){
    const url = `${this.base_url}/weekly-program-list/available_date/`;
    return this.http.get(url, this.header);
  };


  GetAgendaEventes(id:string, limit:number, offset:number, day:number){
    const url = `${this.base_url}/weekly-program-event/?limit=${limit}&offset=${offset}&user_id=${id}&day=${day}`;
    return this.http.get(url, this.header);
  };

  ChangeEventStatus(event:string, data:{}){
    const url = `${this.base_url}/weekly-program-event/${event}/`;
    return this.http.patch(url, data, this.header);
  };

}
