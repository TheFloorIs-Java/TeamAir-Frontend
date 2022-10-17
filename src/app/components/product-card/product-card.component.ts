import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit{

  quantity : number = 0;
  cartCount!: number;
  products: {
    product: Product,
    quantity: number
  }[] = [];
  subscription!: Subscription;
  totalPrice: number = 0;

  @Input() productInfo!: Product;

  constructor(private productService: ProductService) { }
  
  ngOnInit(): void {
    this.subscription = this.productService.getCart().subscribe(
      (cart) => {
        this.cartCount = cart.cartCount;
        this.products = cart.products;
        this.totalPrice = cart.totalPrice;
      }
    );
  }

  addToCart(product: Product): void {

    if (this.quantity != 0) {
      let inCart = false;
      this.products.forEach(
        (element) => {
          if(element.product == product){
            ++element.quantity;
            let cart = {
              cartCount: this.cartCount + this.quantity,
              products: this.products,
              totalPrice: this.totalPrice + product.price*this.quantity
            };
            this.productService.setCart(cart);
            inCart=true;
            return;
          };
        }
      );
  
      if(inCart == false){
        let newProduct = {
          product: product,
          quantity: this.quantity
        };
        this.products.push(newProduct);
        let cart = {
          cartCount: this.cartCount + this.quantity,
          products: this.products,
          totalPrice: this.totalPrice + product.price*this.quantity
        }
        this.productService.setCart(cart);
      }
    }
    
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
