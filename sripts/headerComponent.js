"use strict"
export class HeaderMenu extends HTMLElement {
    /* 
    браузер вызовет этот метод при добавлении елемента в документ
    */
    connectedCallback() {
        this.innerHTML = `
    <header class="header" id="header">
        <div class="cart-icon">
            <img id="open-cart" src=${this.getAttribute("cart-icon-src")}>
            <span id="cartCount"></span>
        </div>
        <ul class="menu">
            <li>
                <a href=${this.getAttribute("link-home-href")} class="menu__link">
                    <img src=${this.getAttribute("img-home-src")}>
                </a>
            </li>
            <li>
                <a href=${this.getAttribute("link-headphones-href")} class="menu__link">
                    <img src=${this.getAttribute("img-headphones-src")}>
                </a>
            </li>
            <li>
                <a href=${this.getAttribute("link-desktop-href")} class="menu__link">
                    <img src=${this.getAttribute("img-desktop-src")}>
                </a>
            </li>
        </ul>
        <div class="form-search-div">
            <form class="form-search">
                <input type="hidden" name="searchid">
                <input type="search" name="text" required placeholder="Search">
                <input type="image" src=${this.getAttribute("form-search-img")} />
            </form>
        </div>
    </header>
        `
    }
}