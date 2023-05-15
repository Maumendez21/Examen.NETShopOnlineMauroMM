import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/Interfaces/Product.interface';
import { CartItem } from 'src/app/Models/CartItem';
import { ProductService } from 'src/app/Services/product.service';
import * as cartAction from 'src/app/Shared/cart/redux/cart.action';
import { AppState } from 'src/app/app.reducer';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  public listProducts!: Product[];
  public itemsSubs!: Subscription;
  public isLoading = false;

  public total: number = 0;
  public totalTemp: number = 0;
  public items: CartItem[] = [];
  public itemsTemp: CartItem[] = [];
  constructor(private productService: ProductService, private store: Store<AppState>, private toastr: ToastrService ) { }

  ngOnInit(): void {
    this.load();
  }


  load(){
    this.isLoading = true;


    this.productService.ProductsList()
    .subscribe(resp => {
      this.isLoading = false
      this.listProducts = resp;

      
    })
    
    this.itemsSubs = this.store.select('cart')
    .subscribe((resp) => {
      this.items = resp.cartItems!;
      this.total = resp.total;
    })
    

  }

  addToCart(product: Product)
  {
    const cartItem: CartItem = {
      productId: product.idPorduct,
      amount: 1,
      NameProduct: product.nameProduct,
      price: product.price,
      idCartItem: 0
    };

    this.totalTemp += cartItem.price;
    
    
    this.total = this.totalTemp;
    
    this.itemsTemp.push(cartItem);
    this.items = this.itemsTemp.map(i => ({...i}))
    this.store.dispatch(cartAction.setCartItems({cartItems: this.items}));
    this.store.dispatch(cartAction.setTotal({total: this.total}));
    this.toastr.success(`${product.nameProduct} agregado al carrito`, 'Agregado');
  }
}
