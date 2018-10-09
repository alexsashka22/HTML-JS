'use strict';
const tabs = document.querySelectorAll('nav a');
const content = document.getElementById('content');
const preload = document.getElementById('preloader');

const xhr = new XMLHttpRequest();

xhr.addEventListener('load', onLoad);
xhr.open('GET', tabs[0].href);
xhr.send();

function defaultEvent(event) {
  for (let tab of tabs) {
    tab.classList.remove('active');
  };

  event.currentTarget.classList.add('active');
  event.preventDefault();
  xhr.addEventListener('loadstart', onLoadStart);
  xhr.addEventListener('load', onLoad);
  xhr.addEventListener('loadend', onLoadEnd);
  xhr.open('GET', event.currentTarget.href);
  xhr.send();
};

function onLoad() {
  content.innerHTML = xhr.responseText;
};

function onLoadStart() {
  preload.classList.remove('hidden');
};

function onLoadEnd() {
  preload.classList.add('hidden');
};

for (const tab of tabs) {
  tab.addEventListener('click', defaultEvent);
};
