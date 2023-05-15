import { createAction, props } from '@ngrx/store';
import { CartItem } from 'src/app/Models/CartItem';

export const setCartItems = createAction('[Cart] setCartItems', 
props<{ cartItems: CartItem[] }>());
export const unSetCartItems = createAction('[Cart] unSetCartItems');


export const setTotal = createAction('[Cart] setTotal', 
props<{ total: number}>());
export const unSetTotal = createAction('[Cart] unSetTotal');