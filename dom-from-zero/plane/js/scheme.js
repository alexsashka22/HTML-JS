'use strict';

const acSelect = document.getElementById('acSelect'),
      btnSeatMap = document.getElementById('btnSeatMap'),
      btnSetFull = document.getElementById('btnSetFull'),
      btnSetEmpty = document.getElementById('btnSetEmpty'),
      seatMapDiv = document.getElementById('seatMapDiv'),
      seatMapTitle = document.getElementById('seatMapTitle'),
      totalPax = document.getElementById('totalPax'),
      totalAdult = document.getElementById('totalAdult'),
      totalHalf = document.getElementById('totalHalf');

btnSetEmpty.disabled = true; //Пока не отображена схема самолёта, кнопка "очистить" должна быть заблокирована.
btnSetFull.disabled = true; //Пока не отображена схема самолёта, кнопка "заполнить" должна быть заблокирована.
totalAdult.textContent = `0`;//места с полной стоимостью (взрослые)
totalHalf.textContent = `0`;//места за половину стоимости (детских)
totalPax.textContent = `0`;//общее количество занятых мест

btnSeatMap.addEventListener('click', getSeatMap);//получение карты самолёта на клик
acSelect.addEventListener('change', clearSeatMap);//освобождение мест при изменнии типа самолёта

function getSeatMap(evt) {// Получение данных
  evt.preventDefault();
  clearSeatMap();
  const request = new XMLHttpRequest();
  request.open('GET', `https://neto-api.herokuapp.com/plane/${acSelect.value}`);
  request.send();
  request.addEventListener('load', onLoad);

  function onLoad() {
    if (request.status === 200) {
      const response = JSON.parse(request.responseText);
   	  showSeatMap(response);
    };
  };
};

function showSeatMap(map) {//Отрисвка карты самолёта
  const planeMap = document.createDocumentFragment();	//создание разметки из более чем одного элемента
  seatMapTitle.textContent = `${map.title} (${map.passengers} пассажиров)`;//Заголовок с идентификатором seatMapTitle используйте для отображения выбранного самолёта и количества пассажиров в нём. Отобразите их в формате: Airbus A320 (186 пассажиров)
  map.scheme.forEach((row, rowNumber) => createRow(row, rowNumber));

  function createRow(row, rowNumber) {//отрисовка ряда
  	const rowDiv = createElem('div', 'row seating-row text-center', [
  					  createElem('div', 'col-xs-1 row-number', [
  						createElem('h2', '', `${rowNumber + 1}`)// номер ряда
  					  ])
  				   ]);

    let seatDiv;
    let letters = [];

  	switch (row) {
  	  case 6:
        letters = map.letters6;//в ряду 6 мест
  	  	break;
  	  case 4:
        letters = map.letters4;//в ряду 4 места
  	  	break;
  	};

  	for (let i = 0; i < 6; i++) {
  	  if (i === 0 || i === 3) {
   	    seatDiv = createElem('div', 'col-xs-5', ''); //группировка мест по 3
  	  };

  	  if (letters[i]) {
  	    seatDiv.append(createElem('div', 'col-xs-4 seat', [createElem('span', 'seat-label', letters[i])]));//добавление буквенного кода места
  	  } else {
  	    seatDiv.append(createElem('div', 'col-xs-4 no-seat', ''));//отсутствие сиденья в ряду
  	  };

  	  if (i === 2 || i === 5) {
  	  	rowDiv.append(seatDiv);
  	  };
  	};

  	planeMap.append(rowDiv);//добавляем
  	seatMapDiv.appendChild(planeMap);//Схему мест в самолёте необходимо поместить в тело тега с идентификатором seatMapDiv
  };


  btnSetEmpty.disabled = false;
  btnSetFull.disabled = false;

  const seats = seatMapDiv.querySelectorAll('.seat');

  for (let seat of seats) {
    seat.addEventListener('click', selectSeat);
  };

  function selectSeat() {//выбор места
    event.preventDefault();
    if (event.altKey) {//нажатый Альт - добавляем детей
      this.classList.remove('adult');
      this.classList.toggle('half');
    } else {//иначе добавляем взрослых
      this.classList.remove('half');
     this.classList.toggle('adult');
    };

    countSeats();
  };

  btnSetFull.addEventListener('click', () => {//все места заняты
    event.preventDefault();
    for (let seat of seats) {
      if (event.altKey) {//все дети при нажатом Альте
  	    seat.classList.remove('adult');
  	    seat.classList.add('half');
      } else {//иначе все взрослые
    	seat.classList.remove('half');
  	    seat.classList.add('adult');
  	  }
    }
    countSeats();
  });

  btnSetEmpty.addEventListener('click', () => {//все места пусты
    event.preventDefault();
    for (let seat of seats) {
  	  seat.classList.remove('half');
  	  seat.classList.remove('adult');
    };

    countSeats();
  });

  function countSeats() {//счётчик мест
    let countAdult = 0;
    let countHalf = 0;
    for (let seat of seats) {
      countAdult += seat.classList.contains('adult');
      countHalf += seat.classList.contains('half');
    }
    totalAdult.textContent = `${countAdult}`;
    totalHalf.textContent = `${countHalf}`;
    totalPax.textContent = `${countAdult + countHalf}`;
  };
};


function createElem(tagName, classList, children) {//создаём элемент
  const el = document.createElement(tagName);
  el.className = classList;

  if (typeof children === 'string') {
    el.textContent = children;
  } else if (children instanceof Array) {
    children.forEach(child => el.appendChild(child));
  };

  return el;
};

function clearSeatMap() {//исходное состояние
  seatMapDiv.textContent = '';
  seatMapDiv.append(createElem('h3', 'text-center', 'Самолёт не выбран'));
  seatMapTitle.textContent = 'Выберите самолёт';
  btnSetEmpty.disabled = true;
  btnSetFull.disabled = true;
};
