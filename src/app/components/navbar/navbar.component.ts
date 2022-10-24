import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  cartCount!: number;
  subscription!: Subscription;
  // checks if the logged in person is admin,
  // getting access to the admin menu (add-update-component)
  isAdmin: boolean = this.authService.isAdmin;

  constructor(
    private authService: AuthService,
    private router: Router,
    private productService: ProductService
  ) {}

  /**
   * This method gets the to-be-populated cart from the product service and updates the number of products added
   * to the cart whenever a product is being added to the cart
   */
  ngOnInit(): void {
    this.subscription = this.productService
      .getCart()
      .subscribe((cart) => (this.cartCount = cart.cartCount));
  }

  /**
   * This method resets the cart's used resources from user to user
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /**
   * This method logs the user out and re-routes to the login page
   * By using authService, it saves the user's activity till the next logins
   */
  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
