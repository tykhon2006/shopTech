"use strict"

const CART_KEY = "cart-123-08";

const CART = {
    // добавим данные в хранилище
    setCartData(obj) {
        localStorage.setItem(CART_KEY, JSON.stringify(obj));
        return false;
    },
    // получаем данные из хранилища
    getCartData(){
        return JSON.parse(localStorage.getItem(CART_KEY));
    },
    // очищаем корзину
    clearCart(){
        localStorage.removeItem(CART_KEY);
    },
    // доюавляем товар в корзину
    addToCart(title, price){
        let target = event.target;
        target.disabled = true;
        const cartData = this.getCartData() || {};
        const itemId = target.dataset.id;
        const parentBox = target.parentElement
        const itemTitle = parentBox.querySelector(title).extContent;
        const itemPrice = parentBox.querySelector(price).textContent;
        if(!cartData.hasOwnProperty(itemId)){
            
        }
        console.log(itemPrice);
    },
}

/*  let obj = {
    0: ["Creator 7i", "$800"],
    1: ["V15", "$600"],
} 
console.log(obj.hasOwnProperty("1")) */
/*  CART.setCartData(obj); 

console.log(CART.getCartData());
*/


/* 
obj = JSON.stringify(obj);
console.log(obj);
obj = JSON.parse(obj);
console.log(obj);
 */