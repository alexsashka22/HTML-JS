'use strict';

const canvas = document.getElementById('draw'),
      ctx = canvas.getContext('2d');

let curves = [];//отрисованные точки
let isDrawing = false;
let needsRepaint = false;
let lineColor;//цвет линии
let colorDirection;//изменение цвета
let brushWidth;//толщина линии
let widthIncrease;// направление движения толщины линии: false на уменьшение, true на увеличение.

document.addEventListener('DOMContentLoaded', updateCansvas);//отображение холста после полной отрисовки разметки
window.addEventListener('resize', updateCansvas);//очищение холста при изменении размера браузера
canvas.addEventListener('dblclick', updateCansvas);//очищение холста при двойном клике

function updateCansvas() {//обновление состояние холста
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  curves = [];
  lineColor = 0;
  colorDirection = true;
  brushWidth = 100;
  widthIncrease = false;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

canvas.addEventListener('mousedown', startDrawing);//нажатие левой кнопки мыши
canvas.addEventListener('mouseleave', () => {isDrawing = false; curves = [];});//мыш покинула пределы поля
canvas.addEventListener('mouseup', () => {isDrawing = false; curves = [];});//отжатие левой кнопки мыши
canvas.addEventListener('mousemove', draw);//перемещение мыши

function startDrawing(evt) {//отрисовка
  const curve = [];//точка
  isDrawing = true;
  colorDirection = !evt.shiftKey;//true если шиыфт не нажат, false нажат
  curve.push([evt.offsetX, evt.offsetY]);//помещение в массив точки координаты
  curves.push(curve);
  needsRepaint = true;// означает, что в следующем animation tick все кривые нужно нарисовать заново в соответствии с массивом curves
}

function draw(evt) {//рисуем
  if (isDrawing) {
    colorDirection = !evt.shiftKey;//true если шиыфт не нажат, false нажат
    const point = [evt.offsetX, evt.offsetY];//определение положения точки
    curves[curves.length - 1].push(point);
    needsRepaint = true;
  }
}

function getColor() {//Оттенок меняется при каждом тике на единицу в диапазоне от 0 до 359 включительно
  if (colorDirection) {
  	return (lineColor === 359) ? lineColor = 0 : lineColor += 1;
  } else {
 	return (lineColor === 0) ? lineColor = 359 : lineColor -= 1;
  }
}

function getBrushWidth() {//Толщина линии меняется при каждом тике на единицу в диапазоне от 5 до 100
  if (brushWidth === 100) widthIncrease = false;
  if (brushWidth === 5)	widthIncrease = true;
  return widthIncrease ? brushWidth++ : brushWidth --;
}

function smoothCurveBetween (p1, p2) {//гладкая картинка между точками Безье
  const cp = p1.map((coord, idx) => (coord + p2[idx]) / 2);
  ctx.quadraticCurveTo(...p1, ...cp);
  // ctx.lineWidth = getBrushWidth();
  // ctx.strokeStyle = `hsl(${getColor()}, 100%, 50%)`;
}

function smoothCurve(points) {//гладкая картинка
  ctx.beginPath();
  ctx.lineWidth = getBrushWidth();
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.strokeStyle = `hsl(${getColor()}, 100%, 50%)`;//Насыщенность 100%, светлота 50%

  for (let i = points.length - 2; i < points.length - 1; i++) {
    if (i < 0) {
      ctx.moveTo(...points[0]);
      smoothCurveBetween(points[0], points[i + 1]);
    } else {
      ctx.moveTo(...points[i]);
      smoothCurveBetween(points[i], points[i + 1]);
    };
  }

  ctx.stroke();
}

// rendering
function repaint () {
  curves.forEach(curve => smoothCurve(curve));
}

function tick () {// вызывается каждый раз, когда браузер решит, что пора перерендерить страницу.
  if(needsRepaint) {
    repaint();
    needsRepaint = false;
  }
  window.requestAnimationFrame(tick);
}

tick();
