import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  products: {
    product: Product,
    quantity: number
  }[] = [];
  totalPrice!: number;
  cartProducts: Product[] = [];
  finalProducts: {id: number, quantity: number}[] = []; 

  checkoutForm = new UntypedFormGroup({
    fullname: new UntypedFormControl('', [Validators.required]),
    cardnumber: new UntypedFormControl('', [Validators.required]),
    expiration: new UntypedFormControl('', [Validators.required]),
    cvv: new UntypedFormControl('', [Validators.required]),
    street: new UntypedFormControl('', [Validators.required]),
    city: new UntypedFormControl('', [Validators.required]),
    state: new UntypedFormControl('', [Validators.required]),
    zipcode: new UntypedFormControl('', [Validators.required])
  });

  submitted = false; 
  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.productService.getCart().subscribe(
      (cart) => {
        this.products = cart.products;
        this.products.forEach(
          (element) => this.cartProducts.push(element.product)
        );
        this.totalPrice = cart.totalPrice;
      }
    );
  }
  get f() {
    return this.checkoutForm.controls;
  }


  onSubmit(): void {
    this.submitted = true;
    // stop here if form is invalid
    if (this.checkoutForm.invalid) {
      return;
    }
    this.products.forEach(
      (element) => {
        const id = element.product.id;
        const quantity = element.quantity
        this.finalProducts.push({id, quantity})
      } 
    );

    if(this.finalProducts.length > 0) {
      this.productService.purchase(this.finalProducts).subscribe(
        (resp) => console.log(resp),
        (err) => console.log(err),
        () => {
          let cart = {
            cartCount: 0,
            products: [],
            totalPrice: 0.00
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
