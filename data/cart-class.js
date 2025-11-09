class Cart{
    cartItems ;
    localStorageKey ;

    constructor(localStorageKey){
        this.localStorageKey = localStorageKey;
        this.loadFromStorage();
    }

    loadFromStorage(){
        this.cartItems = JSON.parse( localStorage.getItem(this.localStorageKey)); 

        if(!this.cartItems){
            this.cartItems =[
                {
                productId : "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 1,
                deliveryOptionsId: `1`
                },{
                productId : `15b6fc6f-327a-4ec4-896f-486349e85a3d`,
                quantity: 2,
                deliveryOptionsId: `2`
            }];
        }
    };

    SaveToStorage(){
        localStorage.setItem(this.localStorageKey,JSON.stringify(this.cartItems));
    }

    AddToCart(productId){

        let matchingItem ;

        this.cartItems.forEach((CartItem)=>{
            if (productId === CartItem.productId){
                matchingItem = CartItem;
            }
        });

        if( matchingItem){
            matchingItem.quantity += 1;
        }else{
            this.cartItems.push({
            productId : productId,
            quantity: 1,
            deliveryOptionsId: `1`
            });
        }
        this.SaveToStorage();
    }

    RemoveFromCart(productId){

        let newCart =[];

        this.cartItems.forEach((CartItem) =>{

            let Quantity = CartItem.quantity;
            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            if(CartItem.productId === productId ){
                if(Quantity > 1){
                    newCart.push(CartItem);
                CartItem.quantity = CartItem.quantity-1 ;
                document.querySelector(`.js-quantity-label-${CartItem.productId}`).innerHTML = CartItem.quantity;
                }else if( Quantity === 1){
                container.remove();
                }
            }else if( CartItem.productId !== productId ){
                newCart.push(CartItem);
            }
            
        });
        this.cartItems = newCart;
        SaveToStorage();
    }

    UpdateDeliveryOption(productId, deliveryOptionId){
        let matchingItem ;

        this.cartItems.forEach((CartItem)=>{
            if (productId === CartItem.productId){
                matchingItem = CartItem;
            }
        });
        matchingItem.deliveryOptionsId = deliveryOptionId;

        thisSaveToStorage();
    }


    UpdateCartQuantity(){
        let TotalQuantity = 0;
        this.cartItems.forEach(product => {
            TotalQuantity += product.quantity;
            console.log(TotalQuantity)
        });
        if(TotalQuantity){
            document.querySelector(`.js-cart-quantity`).innerHTML = TotalQuantity;
        }else{
            document.querySelector(`.js-cart-quantity`).innerHTML = 0;
        }
    }
}

const cart = new Cart('Cart-oop');
const businessCart = new Cart('Cart-business');

console.log(cart)
console.log(businessCart)
console.log(businessCart instanceof Cart)