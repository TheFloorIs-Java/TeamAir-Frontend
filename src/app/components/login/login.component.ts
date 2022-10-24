import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  success = "";
  loginForm = new UntypedFormGroup({
    email: new UntypedFormControl('', [Validators.required]),
    password: new UntypedFormControl('', [Validators.required])
  })
  
  submitted = false; 
  constructor(private authService: AuthService, private router: Router) { }
  
  message: String =  ""; 


  ngOnInit(): void {
  }
  get f() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value).subscribe(
      (data) => {
        this.authService.loggedIn=true;
        this.authService.email = data.email;
        this.authService.id = data.id;
        this.authService.isAdmin=(data.userOrAdmin=="admin"); //checks for admin, if true then they are admin
      },
      (err) => 
      {console.log(err); this.message = "Invalid email or password"},
      () => this.router.navigate(['home'])
    );
  }

  register(): void {
    this.router.navigate(['register']);
  }

}
