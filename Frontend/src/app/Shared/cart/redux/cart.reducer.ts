import { createReducer, on } from '@ngrx/store';

import { setCartItems, setTotal, unSetCartItems, unSetTotal } from './cart.action';
import { CartItem } from 'src/app/Models/CartItem';

export interface State {
  cartItems: CartItem[] | null;
  total: number
}

export const initialState: State = {
    cartItems: [],
    total: 0
};

export const _cartReducer = createReducer(
  initialState,

  on(setCartItems, (state, { cartItems }) => ({ ...state, cartItems:  [...cartItems]  })),
  on(unSetCartItems, (state) => ({ ...state, cartItems: [] })),
 
  on(setTotal, (state, { total }) => ({ ...state, total: total})),
  on(unSetTotal, (state) => ({ ...state, total: 0 })),
  
);
