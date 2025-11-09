export let cart;


loadFromStorage();


export function loadFromStorage(){
    cart = JSON.parse( localStorage.getItem(`Cart`)); 
if(!cart){
 cart =[
    {
    productId : "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 1,
    deliveryOptionsId: `1`
    },{
    productId : `15b6fc6f-327a-4ec4-896f-486349e85a3d`,
    quantity: 2,
    deliveryOptionsId: `2`
    }
];
}


}

function SaveToStorage(){
    localStorage.setItem(`Cart`,JSON.stringify(cart));
}


export function AddToCart(productId){

    let matchingItem ;

    cart.forEach((CartItem)=>{
        if (productId === CartItem.productId){
            matchingItem = CartItem;
        }
    });

    if( matchingItem){
        matchingItem.quantity += 1;
    }else{
        cart.push({
        productId : productId,
        quantity: 1,
        deliveryOptionsId: `1`
        });
    }
    SaveToStorage();
}
export function UpdateCartQuantity(){
 let TotalQuantity = 0;
    cart.forEach(product => {
        TotalQuantity += product.quantity;
    });
    if(TotalQuantity){
        document.querySelector(`.js-cart-quantity`).innerHTML = TotalQuantity;
    }else{
        document.querySelector(`.js-cart-quantity`).innerHTML = 0;
    }
}


export function RemoveFromCart(productId){

    let newCart =[];

    cart.forEach((CartItem) =>{

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
    cart = newCart;
    SaveToStorage();
}
export function UpdateDeliveryOption(productId, deliveryOptionId){
      let matchingItem ;

    cart.forEach((CartItem)=>{
        if (productId === CartItem.productId){
            matchingItem = CartItem;
        }
    });
    matchingItem.deliveryOptionsId = deliveryOptionId;

    SaveToStorage();
}

