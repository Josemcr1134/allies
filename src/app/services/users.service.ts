import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public base_url:string =  environment.base_url;
  get header() {
    return {
      headers: {
        'authorization': `Bearer ${localStorage.getItem('net_token')}`
      }
    }
  }
  constructor(private http:HttpClient) { }

  GetUsers( limit:number, offset:number, search:string = ''){
    const url = `${this.base_url}/subordinates/?limit=${limit}&offset=${offset}&search=${search}`;
    return this.http.get(url, this.header);
  };

  NewSubordinateUser(data:{}){
    const url = `${this.base_url}/register/subordinate/`;
     return this.http.post(url, data, this.header);
  };

  ChangeSubordinateStatus(id:string , data:{}){
    const url = `${this.base_url}/users/${id}/`;
    return this.http.patch(url, data, this.header);
  };
}
