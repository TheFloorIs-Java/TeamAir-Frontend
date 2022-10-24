import { Component, OnInit, Input } from '@angular/core';
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
  @Input() productInfo!: Product;

  constructor(private productService: ProductService, private router: Router) {}

  /**
   * adds the products from the product list to the Shopping Cart
   * adds up total price and cart count in the Shopping Cart
   */
  ngOnInit(): void {
    this.productService.getCart().subscribe((cart) => {
      this.products = cart.products;
      this.products.forEach((element) =>
        this.cartProducts.push(element.product)
      ); // to add products from products section to the cart
      this.totalPrice = cart.totalPrice; // adds the total price
      this.cartCounts = cart.cartCount; //
    });
  }

  /**
   * This method clears the Shopping Cart
   */
  emptyCart(): void {
    let cart = {
      cartCount: 0,
      products: [],
      totalPrice: 0.0,
    };
    this.productService.setCart(cart);
  }

  /**
   * This function should remove each individual product based on its id from cart after a click event fires.
   * This should also decrement from the total price and the cart count from the Shopping Cart.
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

  /**
   * This function increments the quantity of the product selected corresponding to its id
   * @param quantity quantity of the product in the cart
   * @param id associated id with the product in the cart
   */
  increase(quantity: number, id: number) {
    console.log(id);
    if (quantity != this.products[id - 1].product.quantity) {
      this.products[id - 1].quantity += 1;
      this.cartCounts += 1;
      this.totalPrice += this.products[id - 1].product.price;
    }
    let cartProd = {
      cartCount: this.cartCounts,
      products: this.products,
      totalPrice: this.totalPrice,
    };
    this.productService.setCart(cartProd);
  }
  /**
   * This function decrements the quantity of the product selected corresponding to its id
   * @param quantity quantity of the product in the cart
   * @param id associated id with the product in the cart
   */
  decrease(quantity: number, id: number) {
    if (quantity != 1) {
      this.products[id - 1].quantity -= 1;
      this.cartCounts -= 1;
      this.totalPrice -= this.products[id - 1].product.price;
    }
    let cartProd = {
      cartCount: this.cartCounts,
      products: this.products,
      totalPrice: this.totalPrice,
    };
    this.productService.setCart(cartProd);
  }
}
