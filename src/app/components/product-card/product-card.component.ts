import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  quantity: number = 0;
  cartCount!: number;
  products: {
    product: Product,
    quantity: number
  }[] = [];
  subscription!: Subscription;
  totalPrice: number = 0;
  quantityerror: boolean = false;

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
      if (this.quantity <= this.productInfo.quantity) {
        this.quantityerror = false;
        let inCart = false;

        //This code checks to see if there is an entry for the current product by product id in the cart
        //If there is a current entry for the product, it will add to the current entry rather than make a new entry
        this.products.forEach(
          (element) => {
            if (element.product.id == product.id) {
              element.quantity = element.quantity + this.quantity;
              let cart = {
                cartCount: this.cartCount + this.quantity,
                products: this.products,
                totalPrice: this.totalPrice + product.price * this.quantity
              };
              this.productService.setCart(cart);
              inCart = true;
              return;
            };
          }
        );

        //This code uses inCart to determine whether or not the product we are looking at is currently in the cart
        //Because inCart is false, there is not an entry with our product in the cart, so this code runs to create a new entry by using push
        if (inCart == false) {
          let newProduct = {
            product: product,
            quantity: this.quantity
          };
          this.products.push(newProduct);
          let cart = {
            cartCount: this.cartCount + this.quantity,
            products: this.products,
            totalPrice: this.totalPrice + product.price * this.quantity
          }
          this.productService.setCart(cart);
        }
      } else {
        this.quantityerror = true;
      }

    }

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
