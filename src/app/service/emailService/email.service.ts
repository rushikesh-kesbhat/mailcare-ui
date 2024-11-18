import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }
  Backend_API = "http://localhost:8080"



  validateEmail(userData: any): Observable<any> {
 
   const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*'
    });
    return this.http.post(this.Backend_API+"/mail/validate", userData, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  saveEmailConfiguration(EmailConfiguration: any): Observable<any> {
 
    const headers = new HttpHeaders({
       'Content-Type': 'application/json',
       'Access-Control-Allow-Origin':'*'
     });
     return this.http.post(this.Backend_API+"/mail/saveConfiguration", EmailConfiguration, { headers })
       .pipe(
         catchError(this.handleError)
       );
   }

   

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError('An error occurred; please try again later.');
  }
}
