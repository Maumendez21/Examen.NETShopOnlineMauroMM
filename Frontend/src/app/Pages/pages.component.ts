import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as action from '../Shared/cart/redux/cart.action';
import { CartItem } from '../Models/CartItem';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  public cartItems: CartItem[] = [];
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(action.setCartItems({ cartItems: this.cartItems}));
  }

}
