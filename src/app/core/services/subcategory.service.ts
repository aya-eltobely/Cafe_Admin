import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubCategory } from '../../shared/Models/sub-category';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

  apiUrl = `http://cafe.runasp.net/api/Admin/SubCategory`;

  constructor(private http:HttpClient) { }

  getallsubcategory()
  {
    return this.http.get(this.apiUrl);
  }

  addsubcategory(subcategory:SubCategory)
  {
    return this.http.post( this.apiUrl , subcategory )
  }

  editsubcategory(id:number,subcategory:SubCategory)
  {
    console.log(id,subcategory);
    return this.http.put(this.apiUrl+`/${id}`,subcategory);
  }

  deletesubcategory(id:number)
  {
    return this.http.delete(this.apiUrl+`/${id}`);
  }



}
