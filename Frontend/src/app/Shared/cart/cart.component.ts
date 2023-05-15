import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CartItem, CartItemSend, Order } from 'src/app/Models/CartItem';
import { AppState } from 'src/app/app.reducer';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from 'src/app/Services/order.service';
import { AuthService } from 'src/app/Services/auth.service';
import { unSetCartItems } from './redux/cart.action';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public itemsSubs!: Subscription;
  public items!: CartItem[];
  public itemsSend!: any[];
  public total = 0;
  public suma = 0;
  public idUser = 0;
  public isLoading = false;


  constructor(private store: Store<AppState>, 
    private toast: ToastrService, 
    private authService: AuthService,
    private orderService: OrderService) { }

  ngOnInit(): void {

    if (this.authService.Data) {
      this.idUser = this.authService.Data.id || '';
    }
    this.itemsSubs = this.store.select('cart')
    .subscribe(({cartItems}) => {
      this.items = cartItems!
      this.suma= 0;
      this.items.map(i => {
        this.suma = this.suma + i.price
      })
      this.total = this.suma;
    })
  }


  addAmount(cart: CartItem, i: number, event: any)
  {
      // calcula  el total si editan lac cantidad de items
    
  }

  buy()
  {
    if (localStorage.getItem('token') == '' || !localStorage.getItem('token')) {
      this.toast.warning('Debes inicar sesión para poder comprar estos productos');
      return;
    }

    this.isLoading = true;

    var itemsSend: CartItemSend[] = [];

    this.items.forEach(element => {
      var obj: CartItemSend = {
        productId: element.productId,
        amount: element.amount,
        price: element.price,
        idCartItem: 0
      }

      itemsSend.push(obj);
    });
    
    const data: Order = {
      userId: this.idUser,
      total: this.total,
      cartItems: itemsSend
    }


    

    this.orderService.buy(data)
    .subscribe(resp => {
      this.isLoading = false;
      if (!resp.ok) {
        this.toast.error(resp.message);
        return;
      }
      this.toast.success(resp.message + " " + resp.date, 'Compra realizada');

      this.store.dispatch(unSetCartItems());
      this.total = 0;
      location.reload();
    })



  }

}
