import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:5000/companys/';
const baseUrl2 = 'http://localhost:5000/verifyCompanys/'
@Injectable({
  providedIn: 'root'
})
export class CompServiceService {

  constructor(private http: HttpClient) { }
  createLogin(data): Observable<any> {
    return this.http.post(baseUrl + 'login', data);
    console.log('logged in')
  }
  
  createRegister(data): Observable<any> {
    console.log(data.logo)
    let obj = {
    name: data.name,
    email: data.email,
    password: data.password,
    street: data.street,
    city: data.city,
    zipCode: data.zipCode,
    description: data.description,
    phoneNumber1: data.phoneNumber1,
    phoneNumber2: data.phoneNumber2,
    numberPatent: data.numberPatent,
    logo:data.logo,
    };
    console.log(obj)
    console.log(baseUrl2 + 'register');
    return this.http.post(baseUrl2 + 'register', obj);
  }
  modifyInfo(data,id): Observable<any> {
    const obj = {
      phoneNumber1:data.phoneNumber1,
      street:data.street,
      city:data.city,
      codeZip:data.codeZip,
    };
    console.log(obj)
    console.log(baseUrl2 + 'register');
    return this.http.put(baseUrl + `${id}`, data);
  }
  
  getInfo(): Observable<any> {
    return this.http.get(baseUrl)
  }
  sendEmail(data): Observable<any> {
    console.log(data)
    return this.http.post(baseUrl + 'changPass', data)
  }
  checkCode(data): Observable<any> {
    console.log(data)
    return this.http.post(baseUrl +'checkCode', data)
  }
  changePass(data): Observable<any> {
    let obj = {
      email: data.email,
      newPassword: data.newPassword,
    };
    console.log(data)
    console.log(baseUrl);
    return this.http.patch(baseUrl + 'password', data);
  }

}
