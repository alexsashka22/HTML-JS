'use strict';
const canvas = document.getElementById('wall'),
      ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.strokeStyle = '#ffffff';
const curves = []; //храним все нарисованные кривые в массиве

function getCircle(x, y, size) {//круг
  ctx.beginPath();
  ctx.lineWidth = 5 * size;//Толщина обводки
  ctx.arc(x, y, size * 12, 0, 2 * Math.PI); //x, y, Радиус круга равен 12 * size, начальный угол, конечный угол
  ctx.stroke();
}

function getCross(x, y, size, angle) {//крест
  ctx.save();
  ctx.beginPath();
  ctx.lineWidth = 5 * size;//Толщина обводки
  ctx.translate(x , y);//Перемещение холста
  ctx.rotate(angle);//Поворот крестика
  ctx.translate(-x , -y);
  ctx.moveTo(x, y - size * 20);//отрисовка. Сторона крестика равна 20 * size
  ctx.lineTo(x, y + size * 20);
  ctx.moveTo(x - size * 20, y);
  ctx.lineTo(x + size * 20, y);
  ctx.stroke();
  ctx.restore();
}

function randomValue(min, max) {//любое рандомное число
  return Math.random() * (max - min) + min;
}

function getTimeFunction() { //функция времени, плавно перемещающая объект
  const choose = Math.floor(randomValue(0, 2));
  switch (choose) {
    case 0:
      return function nextPoint(x, y, time) {
        return {
          x: x + Math.sin((50 + x + (time / 10)) / 100) * 3,
          y: y + Math.sin((45 + x + (time / 10)) / 100) * 4
        };
      };

    case 1:
      return function nextPoint(x, y, time) {
        return {
          x: x + Math.sin((x + (time / 10)) / 100) * 5,
          y: y + Math.sin((10 + x + (time / 10)) / 100) * 2
        };
     };
  };
};

function createObjects() {//создаём объекты
  const num = Math.floor(randomValue(50, 201)); //случаное кол-во объектов от 50 до 200
  for (let i = 0; i < num; i++) {
    const object = {};
    object.size = Math.floor(randomValue(100, 601)) / 1000; //относительный размер size, случайное число от 0.1 до 0.6 единиц
    object.x = Math.floor(randomValue(0, canvas.width + 1)); //случаные координаты
    object.y = Math.floor(randomValue(0, canvas.height + 1));
    object.nextPoint = getTimeFunction();

    if (i % 2) {//если нечёт, тогда создаём крест
      object.create = getCross;
      object.velocity = Math.floor(randomValue(-200, 201)) / 1000;//Крестик должен медленно поворачиваться со случайной скоростью в диапазоне -0.2 до 0.2 на тик
      object.angle = Math.floor(randomValue(0, 360));//угол поворота от 0 до 360 градусов
    } else {//если чёт, тогда создаём круг
      object.create = getCircle;
      object.angle = 0;
    };

    curves.push(object);//добавляем нарисованные объекты в массив
  }
}

createObjects();

function animate() {//запускаем функчию анимации для всех объектов в массиве curves
  ctx.clearRect(0, 0, canvas.width, canvas.height);//очищаем холст
  curves.forEach(object => {
    const nextPoint = object.nextPoint(object.x, object.y, Date.now());
    object.create(nextPoint.x, nextPoint.y, object.size, object.angle += object.velocity);
  });
}

function tick(timestamp) {//Фон должен перерисовываться со скоростью 20 кадров в секунду
  if (!(Math.floor(timestamp) % 3)) {
    animate();
  }
  requestAnimationFrame(tick);
}

tick();
