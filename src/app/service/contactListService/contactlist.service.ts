import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactlistService {
  constructor(private http: HttpClient) { }
  Backend_API = "http://localhost:8080"
  
  createNewList(ListData: any): Observable<any> {
 
   const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*'
    });
    return this.http.post(this.Backend_API+"/mail/createList", ListData, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  getUserList(userId:any): Observable<any> {
 
    const headers = new HttpHeaders({
       'Content-Type': 'application/json',
       'Access-Control-Allow-Origin':'*'
     });
     return this.http.get(this.Backend_API+"/mail/getList/"+userId, { headers })
       .pipe(
         catchError(this.handleError)
       );
   }

   getListDetailas(id:any): Observable<any> {
 
    const headers = new HttpHeaders({
       'Content-Type': 'application/json',
       'Access-Control-Allow-Origin':'*'
     });
     return this.http.get(this.Backend_API+"/mail/getListDetails/"+id, { headers })
       .pipe(
         catchError(this.handleError)
       );
   }

   addNewContactInList(contact:any): Observable<any> {
    const headers = new HttpHeaders({
       'Content-Type': 'application/json',
       'Access-Control-Allow-Origin':'*'
     });
     return this.http.post(this.Backend_API+"/mail/addContactInList",contact, { headers })
       .pipe(
         catchError(this.handleError)
       );
   }
   getContactsByListId(id:any): Observable<any> {
 
    const headers = new HttpHeaders({
       'Content-Type': 'application/json',
       'Access-Control-Allow-Origin':'*'
     });
     return this.http.get(this.Backend_API+"/mail/getContactsByListId/"+id, { headers })
       .pipe(
         catchError(this.handleError)
       );
   }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError('An error occurred; please try again later.');
  }
}
