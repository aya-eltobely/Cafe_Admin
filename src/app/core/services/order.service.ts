import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  apiUrl = `http://cafe.runasp.net/api/Admin/Order`;

  constructor(private http:HttpClient) { }

  getAllOrder()
  {
    return this.http.get(this.apiUrl);
  }

  rejectOrder(id:number)
  {
    return this.http.get( this.apiUrl+`/reject/${id}`)
  }

  approveOrder(id:number)
  {
    return this.http.get(this.apiUrl+`/approved/${id}`);
  }

  deleteOrder(id:number)
  {
    return this.http.delete(this.apiUrl+`/${id}`);
  }

  assignOrder(id:number , deliveryId:number)
  {
    return this.http.put(this.apiUrl+`/assignToDelivery/${id}`,deliveryId);
  }

  getNumbersOrders(filterBy:number , date:any)
  {
    return this.http.post(this.apiUrl+`/getNumsOfOrders/${filterBy}`,date);
  }

  getTotalOrders(filterBy:number , date:any)
  {
    return this.http.post(this.apiUrl+`/getTotalOfOrders/${filterBy}`,date);
  }

  getOrdersStatus(filterBy:number , date:any)
  {
    return this.http.post(this.apiUrl+`/getOrdersStatus/${filterBy}`,date);
  }

  getOrdersInYear(date:any)
  {
    return this.http.post(this.apiUrl+`/getOrdersInYear`,date);
  }

}
