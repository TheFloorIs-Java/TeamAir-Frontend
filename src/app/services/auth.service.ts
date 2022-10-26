import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authUrl: string = `${environment.baseUrl}/auth`;
  loggedIn: boolean = false;
  isAdmin: boolean =false; //checks for admin
  id: number = 0;
  email: string = "";

  constructor(private http: HttpClient, private router: Router) {}

  /**
   * This method posts the User credentials for login
   * @param email email submitted by the user
   * @param password password submitted by the user
   * @returns the POST response from the server side
   */
  login(email: string, password: string): Observable<any> {
    const payload = { email: email, password: password };
    return this.http.post<any>(`${this.authUrl}/login`, payload, {
      headers: environment.headers,
      withCredentials: environment.withCredentials,
    });
  }

  /**
   * This method posts the url that logs the User out
   */
  logout(): void {
    this.http.post(`${this.authUrl}/logout`, null);
  }

  /**
   * This method registers a new user in the database
   * @param firstName first name of the new User to be added
   * @param lastName last name of the new User to be added
   * @param email email of the new User to be added
   * @param password password of the new User to be added
   * @returns the POST response from the server side
   */
  register(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Observable<any> {
    const payload = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };
    return this.http.post<any>(`${this.authUrl}/register`, payload, {
      headers: environment.headers,
    });
  }

  /**
   * Changes the password of a user
   * @param user a user object with a new password
   */
  changePassword(user : User) : void{
    console.log(user);
    this.http.patch<User>(`${this.authUrl}/reset`, user).subscribe(data => console.log(data));
  }

  /**
   * Routing guard function that restricts access to the home page 
   *  if you are not logged in
   * @param route the route we used 
   * @param state the current state of the route
   * @returns true or false if logged in
   */
canActivate(route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): boolean {
  if (!this.loggedIn)  {
    alert('You are not allowed to view this page until you log in');
    this.router.navigateByUrl('');
    return false;
  } 
    return true;
}


}
