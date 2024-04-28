import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Delivery } from '../../shared/Models/delivery';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  apiUrl = `http://cafe.runasp.net/api/Admin/Delivery`;

  constructor(private http:HttpClient) { }

  getAllDelivery()
  {
    return this.http.get(this.apiUrl);
  }

  addDelivery(delivery:Delivery)
  {
    return this.http.post( this.apiUrl , delivery )
  }

  deleteDelivery(id:number)
  {
    return this.http.delete(this.apiUrl+`/${id}`);
  }
}
