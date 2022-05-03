"use strict"

import { renderCart, clearCart as clearCartFunc, addToCart as addToCartFunc, itemCount, cartComponent, showItemCart, createItemPage} from "./cart.js";
import { HeaderMenu } from "./headerComponent.js";
/* регистрируем веб-компоненты */
customElements.define("header-menu", HeaderMenu);
customElements.define("cart-component", cartComponent);

const addToCart = document.querySelectorAll(".product__add-cart");
const cart = document.getElementById("cart");
const cartCount = document.getElementById("cartCount");
const cartContent = document.getElementById("cart-content");
const clearCart = document.getElementById("clear-cart");
const closeCart = document.getElementById("close-cart");
const openCart = document.getElementById("open-cart");

const productItem = document.querySelectorAll(".product__item");

itemCount(cartCount);
openCart.addEventListener("click", openModal);
closeCart.addEventListener("click", closeModal);
clearCart.addEventListener("click", clearCartFunc.bind(this, cartContent, cartCount, addToCart));


function openModal() {
    renderCart(cartContent, cartCount, addToCart);
    cart.style.display = 'flex';
}
function closeModal() {
    cart.style.display = 'none';
}

addToCart.forEach((button) => {
    button.addEventListener("click", e => addToCartFunc(e, ".product__title", ".product__price > span", cartCount, addToCart ));
});
showItemCart(addToCart);

productItem.forEach((item) => {
    item.addEventListener("click", createItemPage);
});


