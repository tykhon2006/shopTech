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
export function clearCart(cartContent, elem) {
    localStorage.removeItem(CART_KEY);
    renderCart(cartContent, elem);
    itemCount(elem);
}
// добавляем товар в корзину
export function addToCart(e, title, price, elem) {
    let target = e.target;
    target.disabled = true;
    const cartData = getCartData() || {};
    const itemId = target.dataset.id;
    const parentBox = target.parentElement;
    const itemTitle = parentBox.querySelector(title).textContent;
    const itemPrice = parentBox.querySelector(price).textContent;
    if (!cartData.hasOwnProperty(itemId)) {
        cartData[itemId] = [itemTitle, itemPrice];
    }
    if (!setCartData(cartData)) {
        target.disabled = false;
    }
    itemCount(elem);
}
export function renderCart(cartContent, elem) {
    const cartData = getCartData();
    let totalItems;

    if (cartData != null) {
        totalItems = '<table class="product__table"><thead><tr><th>Title</th><th>Price</th></tr></thead><tbody>';
        for (const id in cartData) {
            totalItems += '<tr>';
            for (const value of cartData[id]) {
                totalItems += `<td>${value}</td>`;
            }
            totalItems += `<td><button class="btn cart__delete" data-id=${id} >Delete</button></td>`;
            totalItems += '</tr>';
        }
        totalItems += '</tbody></table>';
        cartContent.innerHTML = totalItems;
        addEventDeleteItemCart(cartContent, elem);
    }
    if (cartData === null || Object.keys(cartData).length === 0) {
        cartContent.innerHTML = "Cart clear";
    }
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
export function deleteItemCart(e, cartContent, elem) {
    const cartData = getCartData();
    delete cartData[e.target.dataset.id];
    setCartData(cartData);
    renderCart(cartContent, elem);
    itemCount(elem);
}
// добавляем событие для удаление товара
function addEventDeleteItemCart(cartContent, elem) {
    const closeCart = document.querySelectorAll(".cart__delete");
    closeCart.forEach(btn => {
        btn.addEventListener("click", e => deleteItemCart(e, cartContent, elem));
    });
}




/* export const CART = {
    // добавим данные в хранилище
    setCartData(obj) {
        localStorage.setItem(CART_KEY, JSON.stringify(obj));
        return false;
    },
    // получаем данные из хранилища
    getCartData() {
        return JSON.parse(localStorage.getItem(CART_KEY));
    },
    // очищаем корзину
    clearCart(cartContent) {
        localStorage.removeItem(CART_KEY);
        renderCart(cartContent);
    },
    // добавляем товар в корзину
    addToCart(title, price) {
        let target = event.target;
        target.disabled = true;
        const cartData = getCartData() || {};
        const itemId = target.dataset.id;
        const parentBox = target.parentElement
        const itemTitle = parentBox.querySelector(title).textContent;
        const itemPrice = parentBox.querySelector(price).textContent;
        if (!cartData.hasOwnProperty(itemId)) {
            cartData[itemId] = [itemTitle, itemPrice];
        }
        if (!setCartData(cartData)) {
            target.disabled = false;
        }
    },
    // отрисовка корзины
    renderCart(cartContent) {
        const cartData = getCartData();
        let totalItems;

        if (cartData != null) {
            totalItems = '<table class="product__table"><thead><tr><th>Title</th><th>Price</th></tr></thead><tbody>';
            for (const id in cartData) {
                totalItems += '<tr>';
                for (const value of cartData[id]) {
                    totalItems += `<td>${value}</td>`
                }
                totalItems += `<td><button class="btn cart__delete" data-id=${id} >Delete</button></td>`
                totalItems += '</tr>';
            }
            totalItems += '</tbody></table>';
            cartContent.innerHTML = totalItems;
            addEventDeleteItemCart();
        } else if (cartData === null) {
            cartContent.innerHTML = "Cart clear";
        }
    },
    // удалить товар 
    deleteItemCart() {
        console.log(1);
    },
    // добавляем собітие для удаление товара
    addEventDeleteItemCart() {
        const closeCart = document.querySelectorAll(".cart__delete");
        closeCart.forEach(btn => {
            btn.addEventListener("click", deleteItemCart);
        });
    }
} */