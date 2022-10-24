import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  currentPassword : string = "";
  newPassword : string = "";
  newPasswordReEnter : string = "";
  message :string = "";
  authUrl: string = `${environment.baseUrl}/auth`;

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
  }

  changePassword() {
  this.authService.login(this.authService.email,this.currentPassword).subscribe(
    (data) => {
      this.message = "";
      if (this.newPassword == this.newPasswordReEnter) {
        let user : User = {
          id: this.authService.id,
          email : "",
          password: this.newPassword,
          firstName : "",
          lastName: "",
          userOrAdmin: ""
        }
        this.authService.changePassword(user);

      } else {
        this.message = "Passwords don't match!"
      }
    },
    (err) => 
    {console.log(err); this.message = "Incorrect current password!"},
    
  );
  
  }
}
