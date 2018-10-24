'use strict';

const connection = new WebSocket('wss://neto-api.herokuapp.com/counter');

connection.addEventListener('message', getData);
window.addEventListener('beforeunload', () => {
  connection.addEventListener('error', evt => console.error(evt));
  connection.close(1000);
});

function getData(evt) {
  const counter = document.querySelector('.counter');
  const outputErrors = document.querySelector('output.errors');
  const message = JSON.parse(evt.data);
  counter.innerHTML = message.connections;
  outputErrors.innerHTML = message.errors;
};
