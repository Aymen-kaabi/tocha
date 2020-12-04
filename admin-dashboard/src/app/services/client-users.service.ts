import { Injectable } from '@angular/core';
import { retry, catchError, last } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';

const baseUrl = 'http://localhost:8080/clients/';
const baseUrl2 = 'http://localhost:8080/verifyClients/'
@Injectable({
  providedIn: 'root'
})

export class ClientUsersService {

  constructor(private http: HttpClient) { }


  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
  //  getClient():  Observable<any>{
  //   return this.http
  //   .get(baseUrl).pipe(retry(3), catchError(this.handleError));
  //  }
  getClientUsers(): Observable<any> {
    return this.http
      .get(baseUrl2).pipe(retry(3), catchError(this.handleError));
  }
  getAllClientUsers(): Observable<any> {
    return this.http
      .get(baseUrl).pipe(retry(3), catchError(this.handleError));
  }
 
  confirmClientUser(data): Observable<any> {

    let obj = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      street: data.street,
      city: data.city,
      zipCode: data.zipCode,
      phoneNumber: data.phoneNumber
    };
    console.log(obj)
    return this.http.post(baseUrl + "register", obj);
  }

   deleteClientUser(id): Observable<any> {
    return this.http.delete(baseUrl2 + `${id}`)
  }

  // sendMsg(data):  Observable<any>{
  //   console.log(data)
  //   return this.http.post( baseUrl+ "msg", data)
  //  }

}
