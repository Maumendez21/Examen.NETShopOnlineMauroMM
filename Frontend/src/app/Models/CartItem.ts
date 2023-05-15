
export class Order {

    constructor(
        public userId:    number,
        public cartItems: CartItemSend[],
        public total:     number,){
        
    }

    
}

export class CartItem {

    constructor(
        public idCartItem?: number| any,
        public productId?:  number| any,
        public NameProduct?:  string,
        public amount?:     number| any,
        public price?:      number| any
    ) {
        
    }
    
    
}
export class CartItemSend {

    constructor(
        public idCartItem?: number| any,
        public productId?:  number| any,
        public amount?:     number| any,
        public price?:      number| any
    ) {
        
    }
    
    
}
