import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUpdateComponent } from './add-update/add-update.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { DisplayProductsComponent } from './components/display-products/display-products.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AddUpdateServiceService } from './services/add-update-service.service';
import { AuthService } from './services/auth.service';

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "home", component: DisplayProductsComponent,canActivate : [AuthService] },
  { path: "cart", component: CartComponent, canActivate : [AuthService]},
  { path: "checkout", component: CheckoutComponent , canActivate : [AuthService]},
  { path: "add", component: AddUpdateComponent, canActivate: [AddUpdateServiceService] },
  { path: "reset", component: ResetPasswordComponent, canActivate : [AuthService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
