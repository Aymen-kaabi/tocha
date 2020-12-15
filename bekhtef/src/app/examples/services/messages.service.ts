import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


const baseUrl = 'http://localhost:5000/messages/';
@Injectable({
  providedIn: 'root'
})
export class MessagesService {
constructor(private http: HttpClient) {}
getMessages(): Observable<any> {
  console.log(baseUrl);
  return this.http.get(baseUrl)
}
addMessages(data):Observable<any>{
  let obj = {
    text:data.text,
    count: data.count,
    receiverId: data.receiverId,
  }
  console.log(data)
  return this.http.post(baseUrl + 'register' , data);
}
}
