import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public base_url:string =  environment.base_url;
  get header() {
    return {
      headers: {
        'authorization': `Bearer ${localStorage.getItem('net_token')}`
      }
    }
  }
  constructor(private http:HttpClient) { }

  login(body:{}){
    const url = `${this.base_url}/login/`;
    return this.http.post(url, body);
  };

  ChangePassword(data:{}){
    const url = `${this.base_url}/password/change/`;
    return this.http.post(url, data, this.header);
  };

  ChargeAlliesFiles(data:FormData){
    const url = `${this.base_url}/ally_file/`;
    return this.http.post(url, data, this.header);
  };

  GetAlliesFilesByID(id:string){
    const url = `${this.base_url}/ally_file/${id}`;
    return this.http.get(url, this.header);
  };
  // CHANGE PASSWORD FLUID

  // 1. Send email code
  ResetPassword(data:{}){
    const url = `${this.base_url}/password/reset/`;
    return this.http.post(url, data );
  };

  // 2. Confirm New Password
  ConfirmNewPassword(data:{}){
    const url = `${this.base_url}/password/reset/confirm/`;
    return this.http.post(url, data );
  };
  // Change Avatar

  ChargeAvatar(data:FormData){
    const url = `${this.base_url}/user/`;
    return this.http.patch(url, data, this.header);
  };
}
