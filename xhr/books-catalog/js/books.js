'use strict';

const catalog = document.getElementById('content');

let xhr = new XMLHttpRequest();
xhr.open('GET', 'https://neto-api.herokuapp.com/book/');
xhr.send();

function onLoad() {
  const books = JSON.parse(xhr.responseText);
  catalog.innerHTML = '';
  books.forEach(book => {
    content.innerHTML += `<li
      data-title="${book.title}"
      data-author="${book.author.name}"
      data-info="${book.info}"
      data-price="${book.price}">
      <img src="${book.cover.small}">
    </li>`
  });
};

xhr.addEventListener('load', onLoad);
