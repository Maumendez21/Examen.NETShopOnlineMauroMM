import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../Models/CartItem';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
const base_url = environment.API_URL;
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }
  get headers() {
    return {
      headers: {
        Authorization: 'Bearer ' + this.token,
        'Content-Type': 'application/json',
      },
    };
  }

  buy(data: Order): Observable<any>{
    const url = `${base_url}Order/buy`;
    return this.http.post<any>(url, data, this.headers);
  }

}
