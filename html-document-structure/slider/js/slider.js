'use strict';

function Slider(container) {
  const btnNext = container.querySelector('[data-action="next"]'),
    btnPrev = container.querySelector('[data-action="prev"]'),
    btnFirst = container.querySelector('[data-action="first"]'),
    btnLast = container.querySelector('[data-action="last"]'),
    slides = container.querySelector('.slides');

  moveSlide('first');

  btnNext.addEventListener('click', e => {
    if (!e.target.classList.contains('disabled')) {
      moveSlide('next');
    }
  });
  btnLast.addEventListener('click', e => {
    if (!e.target.classList.contains('disabled')) {
      moveSlide('last');
    }
  });
  btnPrev.addEventListener('click', e => {
    if (!e.target.classList.contains('disabled')) {
      moveSlide('prev');
    }
  });
  btnFirst.addEventListener('click', e => {
    if (!e.target.classList.contains('disabled')) {
      moveSlide('first');
    }
  });

  function moveSlide(step) {
    const currentSlide = container.querySelector('.slide-current');
    let activatedSlide;

    switch (step) {
      case 'next':
        activatedSlide = currentSlide.nextElementSibling;
        break;
      case 'last':
        activatedSlide = slides.lastElementChild;
        break;
      case 'prev':
        activatedSlide = currentSlide.previousElementSibling;
        break;
      case 'first':
        activatedSlide = slides.firstElementChild;
        break;
    };

    if (currentSlide) {
      currentSlide.classList.remove('slide-current');
    };

    activatedSlide.classList.add('slide-current');

    if (activatedSlide.nextElementSibling) {
      btnNext.classList.remove('disabled');
      btnLast.classList.remove('disabled');
    } else {
      btnNext.classList.add('disabled');
      btnLast.classList.add('disabled');
    };

    if (activatedSlide.previousElementSibling) {
      btnPrev.classList.remove('disabled');
      btnFirst.classList.remove('disabled');
    } else {
      btnPrev.classList.add('disabled');
      btnFirst.classList.add('disabled');
    };
  };
};

const sliders = document.querySelectorAll('.slider');
Array.from(sliders).forEach(item => Slider(item));
