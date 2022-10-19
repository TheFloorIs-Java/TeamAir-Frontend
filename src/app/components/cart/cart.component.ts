import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

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
  cartCounts: number = 0;
  cartProducts: Product[] = [];
  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.productService.getCart().subscribe((cart) => {
      this.products = cart.products;
      this.products.forEach((element) =>
        this.cartProducts.push(element.product)
      ); // to add products from products section to the cart
      this.totalPrice = cart.totalPrice; // also adds the total price
      this.cartCounts = cart.cartCount;
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
   * This should also decrement from the total price each time an item gets removed the cart plus
   * the cart count on the cart bar.
   * @param id the item selected for removal
   */
  removeItemsFromService(id: number): void {
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].product.id == id) {
        this.totalPrice -=
          this.products[i].product.price * this.products[i].quantity;
        this.cartCounts -= this.products[i].quantity;
        console.log(this.cartCounts);
        this.products.splice(i, 1);
      }
    }
    let cartProd = {
      cartCount: this.cartCounts,
      products: this.products,
      totalPrice: this.totalPrice,
    };
    this.productService.setCart(cartProd);
  }
}
