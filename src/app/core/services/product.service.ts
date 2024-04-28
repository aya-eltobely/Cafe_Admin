import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../../shared/Models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl = `http://cafe.runasp.net/api/Admin/product`;

  constructor(private http:HttpClient) { }

  getAllProduct()
  {
    return this.http.get(this.apiUrl);
  }

  addProduct(prod:Product)
  {
    return this.http.post( this.apiUrl , prod )
  }

  editProduct(id:number,prod:Product)
  {
    console.log(id,prod);
    return this.http.put(this.apiUrl+`/${id}`,prod);
  }

  deleteProduct(id:number)
  {
    return this.http.delete(this.apiUrl+`/${id}`);
  }
}
