import {cart,RemoveFromCart,UpdateDeliveryOption} from "../data/cart.js";
import { Products } from "../data/products.js";
import {formatCurrencey} from "./utils/money.js";
import {deliveryOptions} from "../data/DeliveryOptions.js";


function renderOrderSummary(){
  let CartSummaryHTML =``;
  let i = 0;
  let itemsQuantity = 0;

  cart.forEach((CartInsideItems) =>{
      const productId = CartInsideItems.productId;
      Products.forEach((products) =>{
          if(productId === products.id){
              ++i;
              itemsQuantity += CartInsideItems.quantity;
              let matchingProduct = products;

              const deliveryOptionId = CartInsideItems.deliveryOptionsId;

              let deliveryOption;

              deliveryOptions.forEach((option) =>{
                if(option.id === deliveryOptionId){
                  deliveryOption = option;
                }
              });

              const Today = dayjs();
              const DeliveryDate = Today.add(deliveryOption.deliveryDays,`days`).format(`dddd, MMMM D`);

              CartSummaryHTML +=`
              <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
              <div class="delivery-date">
                Delivery date: ${DeliveryDate}
              </div>
              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${matchingProduct.image}">
                <div class="cart-item-details">
                  <div class="product-name">
                    ${matchingProduct.name}
                  </div>
                  <div class="product-price">
                    $${formatCurrencey(matchingProduct.priceCents)}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${CartInsideItems.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                      Update
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-quantity-link" data-product-id="${matchingProduct.id}" >
                      Delete
                    </span>
                    </div>
                    </div>
                    <div class="delivery-options">
                      <div class="delivery-options-title">
                        Choose a delivery option:
                      </div>
                      ${DeliveryOptionsHTML(matchingProduct,CartInsideItems)}
                  </div>
                  </div>
                </div>
              </div>
            </div>`;   
            
          }
          document.querySelector(`.js-order-summary`).innerHTML = CartSummaryHTML;
          document.querySelector(`.js-items-quanitity`).innerHTML = `${itemsQuantity} items`;
      });
  });










  function DeliveryOptionsHTML(matchingProduct, CartInsideItems){
    let HTML = ``;


    deliveryOptions.forEach((deliveryOption) =>{
      const Today = dayjs();
      const DeliveryDate = Today.add(
        deliveryOption.deliveryDays,
        `days`
      );
      const dateString = DeliveryDate.format(`dddd, MMMM D`);


      const priceString = deliveryOption.priceCents === 0 
        ? `FREE`
        :`$${formatCurrencey(deliveryOption.priceCents)} -`;

      const isChecked = deliveryOption.id  === CartInsideItems.deliveryOptionsId;


      HTML +=`<div class="delivery-option js-delivery-option"
        data-product-id="${matchingProduct.id}"
        data-delivery-option-id="${deliveryOption.id}">
          <input type="radio" 
            ${isChecked ? `checked` : `` }
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>`;
    });
    return HTML;
  }




  document.querySelectorAll(`.js-delete-quantity-link`).forEach((link)=>{
      link.addEventListener((`click`),() =>{
          const productId = link.dataset.productId;
          RemoveFromCart(productId);
          --itemsQuantity;
          document.querySelector(`.js-items-quanitity`).innerHTML = `${itemsQuantity} items`;
      });
  });
  document.querySelectorAll(`.js-delivery-option`).forEach((element)=>{
    element.addEventListener(`click`,()=>{
      const {productId,deliveryOptionId} = element.dataset;
      UpdateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
    })
  })
}
renderOrderSummary();