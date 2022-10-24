import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product';
import { environment } from 'src/environments/environment';

interface Cart {
  cartCount: number;
  products: {
    product: Product;
    quantity: number;
  }[];
  totalPrice: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productUrl: string = '/api/product';

  private _cart = new BehaviorSubject<Cart>({
    cartCount: 0,
    products: [],
    totalPrice: 0.0,
  });

  private _cart$ = this._cart.asObservable();

  /**
   * This method gets the filled up cart
   * @returns the to-be-populated cart by the _cart object
   */
  getCart(): Observable<Cart> {
    return this._cart$;
  }

  /**
   * This method sets the populated cart into an emptied cart
   * @param latestValue the filled up cart
   * @returns the emptied cart object
   */
  setCart(latestValue: Cart) {
    return this._cart.next(latestValue);
  }

  constructor(private http: HttpClient) {}

  /**
   * This method gets all the products from our database
   * @returns observable array of products
   */
  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.baseUrl + this.productUrl, {
      headers: environment.headers,
      withCredentials: environment.withCredentials,
    });
  }

  /**
   * This method gets a single product by its id
   * @param id product id
   * @returns a product
   */
  public getSingleProduct(id: number): Observable<Product> {
    return this.http.get<Product>(environment.baseUrl + id);
  }

  /**
   * This method edits the products in the database because of a purchase
   * @param products purchased products
   * @returns an observable of any type
   */
  public purchase(
    products: { id: number; quantity: number }[]
  ): Observable<any> {
    const payload = JSON.stringify(products);
    return this.http.patch<any>(
      environment.baseUrl + this.productUrl,
      payload,
      {
        headers: environment.headers,
        withCredentials: environment.withCredentials,
      }
    );
  }
}
