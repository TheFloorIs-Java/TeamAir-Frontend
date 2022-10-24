import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  products: {
    product: Product;
    quantity: number;
  }[] = [];
  totalPrice!: number;
  cartProducts: Product[] = [];
  finalProducts: { id: number; quantity: number }[] = [];

  checkoutForm = new UntypedFormGroup({
    fullname: new UntypedFormControl('', [Validators.required]),
    cardnumber: new UntypedFormControl('', [Validators.required]),
    expiration: new UntypedFormControl('', [Validators.required]),
    cvv: new UntypedFormControl('', [Validators.required]),
    street: new UntypedFormControl('', [Validators.required]),
    city: new UntypedFormControl('', [Validators.required]),
    state: new UntypedFormControl('', [Validators.required]),
    zipcode: new UntypedFormControl('', [Validators.required]),
  });

  submitted = false;
  constructor(private productService: ProductService, private router: Router) {}

  /**
   * This method gets the items from the product list and adds them to the cart in order for
   * the total price to be calculated
   */
  ngOnInit(): void {
    this.productService.getCart().subscribe((cart) => {
      this.products = cart.products;
      this.products.forEach((element) =>
        this.cartProducts.push(element.product)
      );
      this.totalPrice = cart.totalPrice;
    });
  }

  /**
   * This getter method checks if the checkout form inputs are in a certain way and returns it
   */
  get f() {
    return this.checkoutForm.controls;
  }

  /**
   * This method is triggered after the user clicks on the "pay" button
   * If the payment is "invalid", then it exits the function
   * Otherwise, pushes the id and quantity to the finalProducts object array
   * If we have one or more products in the finalProducts object array, it will mark those products as
   * "purchased" and re-route to the home page
   * Otherwise, re-route to the home page
   */
  onSubmit(): void {
    this.submitted = true;
    // stop here if form is invalid
    if (this.checkoutForm.invalid) {
      return;
    }
    this.products.forEach((element) => {
      const id = element.product.id;
      const quantity = element.quantity;
      this.finalProducts.push({ id, quantity });
    });

    if (this.finalProducts.length > 0) {
      this.productService.purchase(this.finalProducts).subscribe(
        (resp) => console.log(resp),
        (err) => console.log(err),
        () => {
          let cart = {
            cartCount: 0,
            products: [],
            totalPrice: 0.0,
          };
          this.productService.setCart(cart);
          this.router.navigate(['/home']);
        }
      );
    } else {
      this.router.navigate(['/home']);
    }
  }
}
