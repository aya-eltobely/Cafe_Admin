import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = `http://cafe.runasp.net/api/Admin/NormalUser`;

  constructor(private http:HttpClient) { }

  getAllUsers()
  {
    return this.http.get(this.apiUrl);
  }

  deactivateUser(id:string)
  {
    return this.http.get(this.apiUrl+`/DeactivatelUser/${id}`);
  }

}
