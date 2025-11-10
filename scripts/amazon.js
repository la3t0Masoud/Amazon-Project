import {cart, AddToCart, UpdateCartQuantity} from '../data/cart.js';
import {Products,loadProducts} from '../data/products.js';
import { formatCurrencey } from './utils/money.js';
UpdateCartQuantity();
//if we want make a const cart = ...  we must write    ===>    import {cart as mycart} from '../data/cart.js';
// and cart (in cart.js) known as my cart and we must use in as my cart
//it is like we imported maycart from cart.js
UpdateCartQuantity();
loadProducts(renderProductsGrid);

function renderProductsGrid(){

    let ProductsHTML = ``;

    Products.forEach((product)=> {
        ProductsHTML += `
            <div class="product-container">
                <div class="product-image-container">
                    <img class="product-image"
                    src="${product.image}">
                </div>

                <div class="product-name limit-text-to-2-lines">
                    ${product.name}
                </div>

                <div class="product-rating-container">
                    <img class="product-rating-stars"
                    src="${product.getStarsUrl()}">
                    <div class="product-rating-count link-primary">
                    ${product.rating.count}
                    </div>
                </div>

                <div class="product-price">
                    ${product.getPrice()}
                </div>

                ${product.extraInfoHTML()} <!--polymorphism = use method without knowing the class-->

                <div class="product-quantity-container">
                    <select>
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    </select>
                </div>

                <div class="product-spacer"></div>

                <div class="added-to-cart">
                    <img src="images/icons/checkmark.png">
                    Added
                </div>

                <button class="add-to-cart-button button-primary js-add-to-cart"
                    data-product-id = "${product.id}">
                    Add to Cart
                </button>
            </div>`;
    });

    document.querySelector(`.js-Products-grid`).innerHTML = ProductsHTML;




    document.querySelectorAll(`.js-add-to-cart`)
    .forEach((button) =>{
        button.addEventListener(`click`, () =>{
            const productId = button.dataset.productId;
            AddToCart(productId);
            UpdateCartQuantity();
        });
    });
}