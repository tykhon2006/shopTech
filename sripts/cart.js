"use strict"

const CART_KEY = "cart-123-08";

// добавим данные в хранилище
function setCartData(obj) {
    localStorage.setItem(CART_KEY, JSON.stringify(obj));
    return false;
}
// получаем данные из хранилища
function getCartData() {
    return JSON.parse(localStorage.getItem(CART_KEY));
}
// очищаем корзину
export function clearCart(cartContent, elem, addCart) {
    localStorage.removeItem(CART_KEY);
    renderCart(cartContent, elem, addCart);
    itemCount(elem);
    showItemCart(addCart)
}
// добавляем товар в корзину
export function addToCart(e, title, price, elem, addCart) {
    let target = e.target;
    target.disabled = true;
    const cartData = getCartData() || {};
    const itemId = target.dataset.id;
    const parentBox = target.parentElement;
    const itemTitle = parentBox.querySelector(title).textContent;
    const itemPrice = parentBox.querySelector(price).textContent;
    const itemImage = parentBox.querySelector("img").src;
    if (!cartData.hasOwnProperty(itemId)) {
        cartData[itemId] = [itemTitle, itemPrice, itemImage];
    }
    if (!setCartData(cartData)) {
        target.disabled = false;
    }
    itemCount(elem);

    let alertProduct = document.createElement("div");
    alertProduct.className = "alert-product";
    alertProduct.innerHTML = `<p><span>${itemTitle}</span> added to cart</p>`
    document.body.append(alertProduct);
    setTimeout(() => alertProduct.remove(), 3000);
    showItemCart(addCart);

}
export function renderCart(cartContent, elem, addCart) {
    const cartData = getCartData();
    let totalItems;
    let totalSum = 0;

    if (!cartData || Object.keys(cartData).length === 0) {
        totalItems = "Cart clear";
    } else {

        totalItems = '<table class="product__table"><thead><tr><th>Title</th><th>Price</th></tr></thead><tbody>';
        for (const id in cartData) {
            totalSum += +cartData[id][1].slice(1);
            totalItems += '<tr>';
            for (let i = 0; i < cartData[id].length; i++) {
                if (i == 2) {
                    totalItems += `<td><img src=${cartData[id][i]}></td>`
                } else {
                    totalItems += `<td>${cartData[id][i]}</td>`;
                }
            }
            totalItems += `<td><button class="btn cart__delete" data-id=${id} >Delete</button></td>`;
            totalItems += '</tr>';
        }
        totalItems += '</tbody></table>';
        totalItems = `<div>${totalItems}<p>Total Amount: ${totalSum}</p></div>`
    }
    cartContent.innerHTML = totalItems;
    addEventDeleteItemCart(cartContent, elem, addCart);
}
export function itemCount(elem) {
    const cartData = getCartData();
    let totalItems;
    if (cartData && Object.keys(cartData).length > 0) {
        totalItems = Object.keys(cartData).length
    } else {
        totalItems = "";
    }
    elem.textContent = totalItems;

}
// удалить товар 
export function deleteItemCart(e, cartContent, elem, addCart) {
    const cartData = getCartData();
    delete cartData[e.target.dataset.id];
    setCartData(cartData);
    renderCart(cartContent, elem, addCart);
    itemCount(elem);
    showItemCart(addCart)
}
// добавляем событие для удаление товара
function addEventDeleteItemCart(cartContent, elem, addCart) {
    const closeCart = document.querySelectorAll(".cart__delete");
    closeCart.forEach(btn => {
        btn.addEventListener("click", e => deleteItemCart(e, cartContent, elem, addCart));
    });
}

export class cartComponent extends HTMLElement {
    /* 
    браузер вызовет этот метод при добавлении елемента в документ
    */
    connectedCallback() {
        this.innerHTML = `
    <div class="cart" id="cart">
        <div class="cart__body">
            <div class="cart__content" id="cart-content"></div>
            <button class="btn cart__clear" id="clear-cart">Clear Cart</button>
            <span class="cart__close" id="close-cart"></span>
        </div>
    </div>
        `
    }
}
// показать товар добавленный в корзину 
export function showItemCart(addCart) {
    const cartData = getCartData();
    console.log(cartData);
    addCart.forEach((button) => {
        if (cartData && Object.keys(cartData).length !== 0 && cartData.hasOwnProperty(button.dataset.id)) {
            button.textContent = `Added to cart`;
        }else{
            button.textContent = `Add to cart`;
        }
    });
}
export function createItemPage() {

}

