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

  averageReviewList: Array<number> =[];


  public addNewReview(productId : number, rating: number, message: string ){
    const payload = { rating:rating, message:message};
   this.http.post<any>(this.authUrl+"/"+productId,payload,{headers: environment.headers, withCredentials: environment.withCredentials}).subscribe(x=> {console.log(x)});
  }

}
