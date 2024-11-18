import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, map, Observable, of, throwError } from 'rxjs';

interface User {
  id: number;
  email: string;
}

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  private user: User | null = null;
  
  constructor(private http: HttpClient) {}
Backend_API = "http://localhost:8080"
  register(userData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*'
    });

    return this.http.post(this.Backend_API+"/auth/register", userData, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }
  // Login Service

  isLoggedIn: boolean = false;

  login(credentials: any): Observable<boolean> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<any>(`${this.Backend_API}/auth/token`, credentials, { headers })
      .pipe(
        map((res) => { 
          console.log("Login response:", res); // Check the structure of res
          const token = res.token; // Assuming response contains the token directly
          localStorage.setItem('JWT_Token', token);
          this.isLoggedIn = true; // Set logged in state
          const user = {
            id: res?.id, // Get the user ID
            email: res?.email // Get the user email
          };
          this.setUser(user); // Optionally, save user details if returned
          return true;
        }),
        catchError((error) => {
          console.error('Login error:', error);
          this.isLoggedIn = false; // Reset logged in state
          return of(false); // Return observable of false on error
        })
      );
  }

  setUser(user: User): void {
    this.user = user;
    console.log("User set:", this.user);
  }

  getUser(): User | null {
    return this.user;
  }
  

  logout(): void {
    this.user = null;
    localStorage.removeItem('JWT_Token');
    this.isLoggedIn = false;
  }

  isUserLoggedIn(): boolean {
    return this.isLoggedIn; // Getter for logged in state
  }
  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error); // Log to console
    return throwError('An error occurred; please try again later.'); // Modify as needed
  }
}
