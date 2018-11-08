"use strict";
const colorSwatch = document.querySelector('#colorSwatch');
const sizeSwatch = document.querySelector('#sizeSwatch');
const quickCart = document.querySelector('#quick-cart');
const AddToCartForm = document.querySelector('#AddToCartForm');

const url = {
    color: 'https://neto-api.herokuapp.com/cart/colors',
    size: 'https://neto-api.herokuapp.com/cart/sizes',
    cart: 'https://neto-api.herokuapp.com/cart',
    removeCart: 'https://neto-api.herokuapp.com/cart/remove'
};

function loadData(url) {
    return fetch(url)
        .then(res => res.json())
        .catch(error => console.log(error));
}

function loadDataPost(url, data) {
    return fetch(url, {
        method: 'POST',
        body: data
    })
        .then(res => res.json())
        .then(res => getCart(res))
        .catch(error => console.log(error));
}

Promise.all([
    loadData(url.color),
    loadData(url.size),
    loadData(url.cart)
])
    .then(res => {
        getColor(res[0]);
        getSize(res[1]);
        getCart(res[2]);
        const sizesInput = document.querySelectorAll('.plain input');
        const colorsInput = document.querySelectorAll('.color input');
        changeStorage(sizesInput, 'size');
        changeStorage(colorsInput, 'color');
        getStorage();
    })
    .catch(er => console.log(er.message));


function getColor(res) {
    const colors = [];
    res.forEach(el => {
        colors.push(`<div data-value=${el.type} class="swatch-element color ${el.type} ${el.isAvailable ? 'available' : 'soldout'}">
              <div class="tooltip">${el.title}</div>
              <input quickbeam="color" id=${el.type} type="radio" name="color" value=${el.type} ${el.isAvailable ? '' : 'disabled'} checked>
              <label for=${el.type} style="border-color: red;">
                <span style="background-color: ${el.code};"></span>
                <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
              </label>
            </div>`
        );
    });
    colorSwatch.innerHTML += colors.join('');
}

function getSize(res) {
    const sizes = [];
    res.forEach(el => {
        sizes.push(
            `<div data-value=${el.type} class="swatch-element plain ${el.type} ${el.isAvailable ? 'available' : 'soldout'}">
              <input id=${el.type} type="radio" name="size" value=${el.type} ${el.isAvailable ? '' : 'disabled'}>
              <label for=${el.type}>
                ${el.title}
                <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
              </label>
            </div>`
        );
    });
    sizeSwatch.innerHTML += sizes.join('');
}

function getCart(res) {
    if (!res.length) {
        showCart(false);
        return;
    }
    const totalSum = res[0].quantity * res[0].price;
    const cart = [];
    res.forEach(el => {
        cart.push(
            `<div class="quick-cart-product quick-cart-product-static" id="quick-cart-product-${el.id}" style="opacity: 1;">
                  <div class="quick-cart-product-wrap">
                    <img src=${el.pic} title=${el.title}>
                    <span class="s1" style="background-color: #000; opacity: .5">$${el.price}</span>
                    <span class="s2"></span>
                  </div>
                  <span class="count hide fadeUp" id="quick-cart-product-count-${el.id}">${el.quantity}</span>
                  <span class="quick-cart-product-remove remove" data-id=${el.id}></span>
            </div>`
        );
    });

    showCart(cart, totalSum);
}

function showCart(data, totalSum) {
    quickCart.innerHTML = '';
    if (data) {
        quickCart.innerHTML =
            `<a id="quick-cart-pay" quickbeam="cart-pay" class="cart-ico open">
                <span>
                    <strong class="quick-cart-text">Оформить заказ<br></strong>
                    <span id="quick-cart-price">$${totalSum}</span>
                </span>
            </a>`;
        quickCart.innerHTML += data;
        removeProduct();
    }
}

function removeProduct() {
    const remove = document.querySelector('.remove');
    remove.addEventListener('click', (evt) => {
        const formData = new FormData();
        formData.append('productId', evt.target.dataset.id);
        loadDataPost(url.removeCart, formData);
    });
}

function changeStorage(elements, param) {
    Array.from(elements).forEach(item => item.addEventListener('change', (evt) => localStorage[param] = evt.target.id));
}

function getStorage() {
    [localStorage.color, localStorage.size].forEach(item => {
        if (item) {
            document.querySelector(`#${item}`).checked = true;
        }
    });
}

function getData(form) {
    const id = form.dataset.productId;
    const formData = new FormData(form);
    formData.append('productId', id);
    return formData;
}

function addToCart(evt) {
    evt.preventDefault();
    loadDataPost(url.cart, getData(evt.currentTarget));
}

AddToCartForm.addEventListener('submit', addToCart);
