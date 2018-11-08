'use strict';

const img = document.querySelector('img.bg');
const name = document.querySelector('.desc > h3');
const desc = document.querySelector('.desc > p');
const avatar = document.querySelector('img.avatar');
const tweets = document.querySelectorAll('.data output')[0];
const followers = document.querySelectorAll('.data output')[1];
const following = document.querySelectorAll('.data output')[2];

function showUser(response) {
  img.setAttribute('src', response.wallpaper);
  name.textContent = response.username;
  desc.textContent = response.description;
  avatar.setAttribute('src', response.pic);
  tweets.textContent = response.tweets;
  followers.textContent = response.followers;
  following.textContent = response.following;

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

loadData('https://neto-api.herokuapp.com/twitter/jsonp')
  .then(showUser);
