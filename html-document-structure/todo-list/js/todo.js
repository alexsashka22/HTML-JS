'use strict';

const checkBoxes = document.querySelectorAll('[type="checkbox"]'),
      label = document.querySelector('label'),
      done = document.querySelector('.done'),
      undone = document.querySelector('.undone');

function checking (event) {
  event.currentTarget.checked ? done.appendChild(event.currentTarget.parentElement) : undone.appendChild(event.currentTarget.parentElement)
};

Array.from(checkBoxes).forEach(checkBox => checkBox.addEventListener('click', checking));
