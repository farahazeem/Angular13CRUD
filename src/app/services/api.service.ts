import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  /**To start the json server run this command: json-server --watch db.json in a separate terminal */
  postProduct(data: any){
   return this.http.post<any>("http://localhost:3000/productList/", data);
  }

  getProduct() {
    return this.http.get<any>("http://localhost:3000/productList/");
  }

  updateProduct(data:any, id:number) {
    return this.http.put<any>("http://localhost:3000/productList/"+id, data)
  }

  deleteProduct(id:number) {
    return this.http.delete<any>("http://localhost:3000/productList/"+id);
  }
}
