'use strict';

const counter = document.getElementById('counter'),
      incrementBtn = document.getElementById('increment'),
      decrementBtn = document.getElementById('decrement'),
      resetBtn = document.getElementById('reset');

let counterValue;

if (localStorage.counterValue != undefined) {
  counterValue = localStorage.counterValue;
  // console.log(localStorage.counterValue);
} else {
  counterValue = 0;
  // console.log(localStorage.counterValue);
}


function resetIndex() {
  counterValue = 0;
  // console.log(counterValue);
  counter.innerHTML = (counterValue);
  localStorage.counterValue = counterValue;
}

function incrementIndex() {
  counterValue++;
  // console.log(counterValue);
  counter.innerHTML = (counterValue);
  localStorage.counterValue = counterValue;
}

function decrementIndex() {
  if (counterValue != 0) {
    counterValue--;
    // console.log(counterValue);
    counter.innerHTML = (counterValue);
    localStorage.counterValue = counterValue;
  }
}

counter.innerHTML = (counterValue);
resetBtn.addEventListener('click', resetIndex);
incrementBtn.addEventListener('click', incrementIndex);
decrementBtn.addEventListener('click', decrementIndex);
