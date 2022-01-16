"use strict"

const addToCart = document.querySelectorAll(".product__add-cart");
const cart = document.getElementById("cart");
const cartContent = document.getElementById("cart-content");
const clearCart = document.getElementById("clear-cart");
const closeCart = document.getElementById("close-cart");
const openCart = document.getElementById("open-cart");

openCart.addEventListener("click", openModal);
closeCart.addEventListener("click", closeModal);

function openModal(){
    cart.style.display = 'flex';
}
function closeModal(){
    cart.style.display = 'none';
}
addToCart.forEach((button)=>{
    button.addEventListener("click", CART.addToCart.bind(CART, ".product__title", ".product__price > span"));
});