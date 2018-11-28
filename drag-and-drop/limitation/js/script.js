'use strict';

const block = document.getElementsByClassName('block')[0];
const message = document.getElementsByClassName('message')[0];
const textarea = document.getElementsByClassName('textarea')[0];

function debounce(callback, delay) {
  let timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      timeout = null;
      callback();
    }, delay);
  };
};

textarea.addEventListener('focus', () => block.classList.add('active'));

textarea.addEventListener('blur', () => {
  block.classList.remove('active');
  message.classList.remove('view');
});

textarea.addEventListener('keydown', debounce(() => {
  message.classList.add('view');
  block.classList.remove('active');
}, 2000));

textarea.addEventListener('input', () => {
  block.classList.add('active');
  message.classList.remove('view');
});
