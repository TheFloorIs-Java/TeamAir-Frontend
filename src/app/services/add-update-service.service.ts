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

  public addNewProduct( name: string, quantity: number, description: string, price: number, image: string ){
    const payload = {name:name, quantity:quantity, description:description,price:price,image:image };
   this.http.put<any>(this.authUrl,payload,{headers: environment.headers, withCredentials: environment.withCredentials}).subscribe(x=> console.log(x));
  }

  public editProduct(name:string, id:number, quantity: number, description: string, price: number, image: string ){
    const payload = {id:id, name:name, quantity:quantity, description:description,price:price,image:image };
     this.http.put<any>(this.authUrl,payload,{headers: environment.headers, withCredentials: environment.withCredentials}).subscribe(x=> console.log(x));
 
  

  }
}
