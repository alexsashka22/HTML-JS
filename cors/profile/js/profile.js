'use strict';

const card = document.querySelector('.card');
const name = card.querySelector('.profileinfo h1');
const position = card.querySelector('.profileinfo h3');
const descriprion = card.querySelector('.profileinfo p');
const img = card.querySelector('.firstinfo img');
const badges = document.querySelector('.badgescard');

function showTech(teches) {
  const techMass = [];
  teches.forEach(tech => techMass.push(`<span class="devicons devicons-${tech}"></span>`));
  badges.innerHTML = techMass.join(' ');
}

function showUser(user) {
  img.src = user.pic;
  name.textContent = user.name;
  position.textContent = user.position;
  descriprion.textContent = user.description;
  loadData(`https://neto-api.herokuapp.com/profile/${user.id}/technologies`).then(showTech);
}

function loadData(url) {
  const functionRandom = 'callback' + `${Math.random()}`.slice(-4);
  return new Promise((done) => {
    window[functionRandom] = done;
    const script = document.createElement('script');
    script.src = `${url}?jsonp=${functionRandom}`;
    document.body.appendChild(script);
  });
}

loadData('https://neto-api.herokuapp.com/profile/me')
  .then(showUser);

window.addEventListener('load', () => card.parentElement.style.display = 'initial');
