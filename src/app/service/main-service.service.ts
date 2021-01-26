import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { Image } from '../model/Image';
import { Book } from '../model/Book';

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {

    public username: String;
    public password: String;

    headerDict = {
      'X-Api-Key': 'd82016f839e13cd0a79afc0ef5b288b3', 
      'X-Auth-Token': '3827881f669c11e8dad8a023fd1108c2',
      'Access-Control-Allow-Origin': '*',
      "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS"
    }

    requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(this.headerDict), 
    };

  constructor(private http: HttpClient) { }

  getImages() {
    return this.http.get<Image[]>('http://localhost:8080/books/getAllImages');
 
  }

  getBooks() {
    return this.http.get<Book[]>('http://localhost:8080/books/getAllBooks');
 
  }

  getProducts=()=>{
    return this.http.get<Book[]>('http://localhost:8080/books/getAllBooks');
  }


  authenticationService = (username: String, password: String) =>{
    return this.http.get('./assets/products.json');
  }

  payload = {
    purpose: 'FIFA 16',
    amount: '2500',
    phone: '9999999999',
    buyer_name: 'John Doe',
    redirect_url: 'http://www.example.com/redirect/',
    send_email: true,
    webhook: 'http://www.example.com/webhoo'
  }
    postPayment=()=>{
  return this.http.post('https://www.instamojo.com/api/1.1/payment-requests/',this.payload,this.requestOptions)
}

}
