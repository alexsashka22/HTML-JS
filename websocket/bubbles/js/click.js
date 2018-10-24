'use strict';

const connection = new WebSocket('wss://neto-api.herokuapp.com/mouse');

connection.addEventListener('open', evt => {
  showBubbles(evt.currentTarget);
});

document.addEventListener('click', evt => {
  const x = evt.clientX;
  const y = evt.clientY;
  connection.send(JSON.stringify({
    x: x,
    y: y
  }));
});
