import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../Interfaces/Product.interface';
import { environment } from 'src/environments/environment';
const base_url = environment.API_URL;
@Injectable({
  providedIn: 'root'
})
export class ProductService {

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
  get headersFile() {
    return {
      headers: {
        Authorization: 'Bearer ' + this.token
      },
    };
  }


  ProductsList(): Observable<Product[]>{
    const url = `${base_url}Product/list`;
    return this.http.get<Product[]>(url).pipe(map((resp) => resp));
  }
  ProductsListByShop(idShop: number): Observable<Product[]>{
    const url = `${base_url}Product/listByShop/${idShop}`;
    return this.http.get<Product[]>(url, this.headers).pipe(map((resp) => resp));
  }
  AddProduct(product: Product, file: File | null): Observable<Product>{

    console.log(file);
    
    const fd = new FormData();
    fd.append('nameProduct', product.nameProduct);
    fd.append('codigo', product.codigo);
    fd.append('descripcion', product.descripcion);
    fd.append('image', file!);
    fd.append('price', product.price.toString());
    fd.append('stock', product.stock.toString());
    fd.append('shopId', product.shopId.toString());

    const url = `${base_url}Product/add`;
    return this.http.post<Product>(url, fd, this.headersFile);
  }
  UpdateProduct(product: Product, file: File | null): Observable<Product>{
    const fd = new FormData();
    fd.append('idPorduct', product.idPorduct.toString()); 
    fd.append('nameProduct', product.nameProduct); 
    fd.append('codigo', product.codigo);
    fd.append('descripcion', product.descripcion);
    fd.append('price', product.price.toString());
    fd.append('urlImage', product.urlImage || '');
    fd.append('stock', product.stock.toString());
    fd.append('shopId', product.shopId.toString());
    
    if (file !== undefined) {
      fd.append('image', file!); 
    }

    const url = `${base_url}Product/update`;
    return this.http.put<Product>(url, fd, this.headersFile);
  }
  DeleteProduct(id: number){
    const url = `${base_url}Product/delete/${id}`;
    return this.http.delete(url, this.headers);
  }

}
