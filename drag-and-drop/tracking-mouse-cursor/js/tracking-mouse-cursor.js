'use strict';

const eyes = document.getElementsByClassName('cat_eye');
let minY, minX, maxX, maxY;

document.addEventListener('mousemove', evt => {
    Array.from(eyes).forEach(eye => throttle(mouseMove(eye, evt.pageX, evt.pageY)))
});

function throttle(callback) {
  let isWaiting = false;
  return function() {
    if (!isWaiting) {
      callback.apply(this, arguments);
      isWaiting = true;
      requestAnimationFrame(() => {
        isWaiting = false;
      });
    }
  };
};

function mouseMove(eye, x, y) {
  x = x - eye.parentElement.getBoundingClientRect().left;
  y = y - eye.parentElement.getBoundingClientRect().top;
  minX = 1;
  minY = 1;
  maxX = eye.parentElement.offsetWidth - eye.offsetWidth;
  maxY = eye.parentElement.offsetHeight - eye.offsetHeight;
  x = Math.min(x, maxX);
  y = Math.min(y, maxY);
  x = Math.max(x, minX);
  y = Math.max(y, minY);
  eye.style.left = `${x}px`;
  eye.style.top = `${y}px`;
};
