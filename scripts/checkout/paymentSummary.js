import { cart } from "../../data/cart.js";
import { formatCurrencey } from "../utils/money.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/DeliveryOptions.js";
import { getItemsQuantity } from "../../data/products.js";

export function renderPaymentSummary(){

    let productPriceCents = 0;
    let shippingPriceCents = 0;
    let itemsCounter = 0;

    cart.forEach((cartItem) => {
        itemsCounter = getItemsQuantity(cartItem.quantity);
        const product = getProduct(cartItem.productId);
        productPriceCents += product.priceCents * cartItem.quantity;

        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionsId);
        shippingPriceCents += deliveryOption.priceCents;
        
        

    });
    let totalBeforeTaxCents = productPriceCents + shippingPriceCents;
    let taxCents = totalBeforeTaxCents * 0.1 ;
    let totalCents = totalBeforeTaxCents + taxCents;
    let paymentSummaryHTML;
    if(cart.length !==0){
      paymentSummaryHTML = `
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div >Items (<span class='js-items-counter'>${itemsCounter}</span>):</div>
            <div class="payment-summary-money">
                $${formatCurrencey(productPriceCents)}
            </div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">
                $${formatCurrencey(shippingPriceCents)}
            </div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">
                $${formatCurrencey(totalBeforeTaxCents)}
            </div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">
                $${formatCurrencey(taxCents)}  
            </div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">
                $${formatCurrencey(totalCents)}
            </div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>`;
    }else{
      paymentSummaryHTML=`your cart is empty :|`
    }
    

          document.querySelector(`.js-payment-summary`).innerHTML = paymentSummaryHTML;
}
renderPaymentSummary