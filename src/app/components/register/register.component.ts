import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    success = "";
    registerForm = new UntypedFormGroup({
    fname: new UntypedFormControl('', [Validators.required]),
    lname: new UntypedFormControl('', [Validators.required]),
    email: new UntypedFormControl('', [Validators.required]),
    password: new UntypedFormControl('', [Validators.required, Validators.minLength(8)])
  })

  submitted = false; 
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {} 
  
  get f() {
    return this.registerForm.controls;
  }

  
  onSubmit(): void {

    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.authService.login(this.registerForm.get('email')?.value, this.registerForm.get('password')?.value).subscribe(
      (data) => {
        () => alert("User already exists")
      }, 
      (err) => { this.authService.register(this.registerForm.get('fname')?.value, this.registerForm.get('lname')?.value, this.registerForm.get('email')?.value, this.registerForm.get('password')?.value).subscribe(
        () => alert("New user registered"),
        (err) => console.log(err),
        () => this.router.navigate(['login'])
       );}, 
       

);

  /*  this.authService.register(this.registerForm.get('fname')?.value, this.registerForm.get('lname')?.value, this.registerForm.get('email')?.value, this.registerForm.get('password')?.value).subscribe(
      () => alert("New user registered"),
      (err) => console.log(err),
      () => this.router.navigate(['login'])
    ); */


  }

}
