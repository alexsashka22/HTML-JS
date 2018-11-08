'use strict';

const canvas = document.querySelector('canvas');
canvas.width = 800;
canvas.height = 400;

const ctx = canvas.getContext('2d'),
      colorArray = ['#ffffff', '#ffe9c4', '#d4fbff'];

function generateSky() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const countStars = getRandomStarsAmount(200, 400);

  for (let i = 0; i < countStars; i++) {
    const r = getRandomStarsAmount(0, 1.1);
    const color = colorArray[getRandomStarsAmount(0, 2)];
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const opacity = Math.random() * (1 - 0.8) + 0.8;
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.globalAlpha = opacity;
    ctx.arc(x, y, r, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();
  };
};

function getRandomStarsAmount(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

canvas.addEventListener('click', generateSky);
