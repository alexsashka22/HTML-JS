'use strict';

const pic = document.querySelector('.cover');
const title = pic.querySelector('font');
const rows = document.querySelectorAll('td');
const ingredients = Array.from(rows).find(td => td.hasAttribute('data-ingredients'));
const rating = Array.from(document.querySelectorAll('td > h1')).find(el => el.hasAttribute('data-rating'));
const star = document.querySelector('.stars > em');
const votes = Array.from(rating.parentElement.children).find(el => el.hasAttribute('data-votes'));
const consumers = document.querySelector('.consumers');

function loadData(url) {
  const functionName = 'cb' + String(Math.random()).slice(-4);
  return new Promise((done, fail) => {
    window[functionName] = done;
    const script = document.createElement('script');
    script.src = `${url}?jsonp=${functionName}`;
    document.body.appendChild(script);
  });
}

function showRecipe(data) {
  console.log(data);
  pic.style.backgroundImage = `url(${data.pic})`;
  title.textContent = data.title;
  ingredients.textContent = data.ingredients.join(', ');
}

function showRating(data) {
  rating.textContent = data.rating.toPrecision(2);
  star.style.width = `${data.rating * 10}` + '%';
  votes.textContent = `${data.votes} оценок`;
}

function showUsers(data) {
  const list = [];
  data.consumers.forEach(user => {
    list.push(`<img src="${user.pic}" title="${user.name}">`);
  });
  list.push(`<span>(+${data.total - data.consumers.length})</span>`);
  consumers.innerHTML = list.join(' ');
}

loadData('https://neto-api.herokuapp.com/food/42')
  .then(showRecipe);

loadData('https://neto-api.herokuapp.com/food/42/rating')
  .then(showRating);

loadData('https://neto-api.herokuapp.com/food/42/consumers')
  .then(showUsers);
