import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

 
  constructor(private http:HttpClient) { }

  login(loginuser:any):Observable<any>
  {
    return this.http.post(`http://cafe.runasp.net/api/Account/login`,loginuser);
  }


}
