import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductService } from './product.service';


@Injectable({
  providedIn: 'root'
})
export class ReviewServiceService {
  authUrl: string = `${environment.baseUrl}/api/review`;
  constructor(private http: HttpClient , private productService: ProductService) { }

 /**
  * Adds a review of a product
  * @param productId id of the product
  * @param rating rating (1-10) of product
  * @param message review message
  */
  public addNewReview(productId : number, rating: number, message: string ){
    const payload = { rating:rating, message:message};
   this.http.post<any>(this.authUrl+"/"+productId,payload,{headers: environment.headers, withCredentials: environment.withCredentials}).subscribe(x=> {console.log(x)});
  }
  /**
   * Deletes a review
   * @param id id of review
   */
  public deleteReview(id:number ){
      this.http.delete<any>(this.authUrl+"/"+id,{headers: environment.headers, withCredentials: environment.withCredentials}).subscribe(x=> console.log(x));
  }

}
