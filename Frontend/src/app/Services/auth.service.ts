import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

const base_url = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get role(): number {
    return parseInt(localStorage.getItem('roleid') || '0') ;
  }
  get Data(): any {
    try {
      
      const user = JSON.parse(localStorage.getItem('data') || '')
      return user;
    } catch (error) {
      return null;
    }
    
    
  }

  get headers() {
    return {
      headers: {
        Authorization: 'Bearer ' + this.token,
        'Content-Type': 'application/json',
      },
    };
  }

  login(data: any): Observable<any> {
    return this.http.post<any>(base_url + 'Auth/login', data).pipe(
      tap((resp) => {
        if (resp.ok) {
          localStorage.setItem('token', resp.token);
          localStorage.setItem('roleid', resp.rol);
          const dataUser = {
            name: resp.name,
            lastName: resp.lastName,
            id: resp.userId
          }
          localStorage.setItem('data', JSON.stringify(dataUser));

          if (resp.shopId != 0) {
            
            localStorage.setItem('shopId', resp.shopId);
          }
        } 
      })
    );
  }
  

  register(dataRegister: any): Observable<any> {
    return this.http.post<any>(base_url + 'Auth/register', dataRegister).pipe(
      tap((resp) => {
        if (resp.ok) {
          localStorage.setItem('token', resp.token);
          localStorage.setItem('roleid', resp.rol);
          const dataUser = {
            name: resp.name,
            lastName: resp.lastName,
            id: resp.userId
          }
          localStorage.setItem('data', JSON.stringify(dataUser));
        } 
      })
    );
  }
}
