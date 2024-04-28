import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../../shared/Models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiUrl = `http://cafe.runasp.net/api/Admin/Category`;

  constructor(private http:HttpClient) { }

  getallcategory()
  {
    return this.http.get(this.apiUrl);
  }

  addcategory(category:Category)
  {
    return this.http.post(this.apiUrl,category);
  }


  editcategory(id:number,category:Category)
  {
    console.log(id,category);
    return this.http.put(this.apiUrl+`/${id}`,category);
  }

  deletecategory(id:number)
  {
    return this.http.delete(this.apiUrl+`/${id}`);
  }

}
