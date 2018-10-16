'use strict';

const box = document.querySelector('.items-list');

box.addEventListener('click', addCart);

function addCart(evt) {
  if(!evt.target.classList.contains('add-to-cart')) return;
  evt.preventDefault();

  const item = {
    'title': evt.target.dataset.title,
    'price': evt.target.dataset.price
  };

  addToCart(item);
};
