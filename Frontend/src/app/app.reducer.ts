import { ActionReducerMap } from '@ngrx/store';
import * as cart from './Shared/cart/redux/cart.reducer';
// import * as auth from './Auth/auth.reducer';
// import * as auth from './Auth/auth.reducer';

export interface AppState {
  cart: cart.State;
//   auth: auth.State;
}

export const appReducers: ActionReducerMap<AppState> = {
  cart: cart._cartReducer,
//   auth: auth._authReducer,
};
