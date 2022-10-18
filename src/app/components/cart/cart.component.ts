import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

interface cartProducts {
  products: {
    product: Product;
    quantity: number;
  }[];
}
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  products: {
    product: Product;
    quantity: number;
  }[] = [];
  totalPrice!: number;
  cartProducts: Product[] = [];
  selectedProduct: String = '';
  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.productService.getCart().subscribe((cart) => {
      this.products = cart.products;
      this.products.forEach((element) =>
        this.cartProducts.push(element.product)
      ); // to add products from products section to the cart
      this.totalPrice = cart.totalPrice; // also adds the total price
    });
  }

  emptyCart(): void {
    let cart = {
      cartCount: 0,
      products: [],
      totalPrice: 0.0,
    };
    this.productService.setCart(cart);
    this.router.navigate(['/home']);
  }
  /**
   * This method should remove each individual product from cart after the "remove" button is clicked.
   * This should also decrement from the total price each time an item gets removed the cart.
   * @param selectedProduct the item selected for removal
   */
  removeItemsFromService(selectedProduct: string): void {
    console.log(this.products);
    let productsRemoved: {
      product: Product;
      quantity: number;
    }[] = this.products;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].product.name == selectedProduct[i]) {
        productsRemoved.slice(i, 1);
        this.products = productsRemoved;
        console.log(this.products);
      }
    }
    // this.products = [];
    // this.totalPrice = 0;
    // this.cartProducts = [];
    // console.log(this.cartProducts);
    // this.productService.getCart().subscribe((cart) => {
    //   cart.products.forEach((element) => {
    //     if (element.product.name != selectedProduct) {
    //       this.products.push(element);
    //     }
    //   });
    //   this.products.forEach((element) => {
    //     if (element.product.name != selectedProduct) {
    //       this.cartProducts.push(element.product);
    //     }
    //   });
    //   this.totalPrice = cart.totalPrice;
    //   console.log(this.cartProducts);
    // });
    // let products = { products: [] };
    // this.productService.setCartProducts(products);
    // this.router.navigate(['/cart']);
    // console.log(products);
  }
}
