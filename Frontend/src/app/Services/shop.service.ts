import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Shop } from '../Interfaces/Shop.interface';

const base_url = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class ShopService {

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

  listShops(): Observable<Shop[]>{
    const url = `${base_url}Shop/list`;
    return this.http.get<Shop[]>(url, this.headers).pipe(map((resp) => resp));
  }
  AddShop(shop: Shop): Observable<Shop>{
    const url = `${base_url}Shop/add`;
    return this.http.post<Shop>(url, shop, this.headers);
  }
  UpdateShop(shop: Shop): Observable<Shop>{
    const url = `${base_url}Shop/update`;
    return this.http.put<Shop>(url, shop, this.headers);
  }
  DeleteShop(id: number){
    const url = `${base_url}Shop/delete/${id}`;
    return this.http.delete(url, this.headers);
  }


}
