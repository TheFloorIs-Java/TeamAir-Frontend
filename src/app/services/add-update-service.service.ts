import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class AddUpdateServiceService {

  authUrl: string = `${environment.baseUrl}/api/product`;

  constructor(private http:HttpClient, private productS : ProductService) { }
/**
 * Adds a product to the database
 * @param name of name product
 * @param quantity quanitiy of product
 * @param description description of product
 * @param price price of product
 * @param image image of product
 */
  public addNewProduct( name: string, quantity: number, description: string, price: number, image: string ){
    const payload = {name:name, quantity:quantity, description:description,price:price,image:image };
   this.http.put<any>(this.authUrl,payload,{headers: environment.headers, withCredentials: environment.withCredentials}).subscribe(x=> console.log(x));
  }
/**
 * Edits a product to the database
 * @param name of name product
 * @param id id of product 
 * @param quantity quanitiy of product
 * @param description description of product
 * @param price price of product
 * @param image image of product
 */
  public editProduct(name:string, id:number, quantity: number, description: string, price: number, image: string ){
    const payload = {id:id, name:name, quantity:quantity, description:description,price:price,image:image };
     this.http.put<any>(this.authUrl,payload,{headers: environment.headers, withCredentials: environment.withCredentials}).subscribe(x=> console.log(x));
  }

  public deleteProduct(id: number){
    this.http.delete<any>(this.authUrl+"/"+id,{headers: environment.headers, withCredentials: environment.withCredentials}).subscribe(x=> console.log(x));
  }


  
}
