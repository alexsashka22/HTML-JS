'use strict';
const forms = document.querySelectorAll('form');
const signInMessage = document.querySelector('.sign-in-htm output');
const signUpMessage = document.querySelector('.sign-up-htm output');
const ref = {
  'signIn': 'https://neto-api.herokuapp.com/signin',
  'signUp': 'https://neto-api.herokuapp.com/signup'
};

function loadData(url, data = {}, bool){
  fetch(url, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(res => {
    bool ? getAnswer(res, signInMessage) : getAnswer(res, signUpMessage, 'зарегистрирован');
  })
  .catch(error =>  console.log(error.message));
}

function getAnswer(data, box, label ='авторизован'){
  box.value = data.error ? data.message : `«Пользователь ${data.name} успешно ${label}`;
}

function getFormData(form){
  const formData = new FormData(form);
  const dataName = {};
  formData.forEach((el, key) => dataName[key] = el);
  return dataName;
}

function getAuth(evt){
  evt.preventDefault();
  const form = evt.currentTarget.dataset.param;
  const url = ref[form];
  loadData(url, getFormData(evt.currentTarget), form === 'signIn');
}

forms.forEach(btn => btn.addEventListener('submit', getAuth));
//console.log(signInMessage, signUpMessage);

// function loadData(url, data = {}, bool){
//   return new Promise((resolve, reject) => {
//     fetch(url, {
//       method: 'POST',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify(data)
//     })
//     .then(res => resolve(res.json()))
//     .catch(error =>  reject(error));
//   })
// }
//
// function getAnswer(data, box, label ='авторизован'){
//   box.value = data.error ? data.message : `«Пользователь ${data.name} успешно ${label}`;
// }
//
// function getFormData(form){
//   const formData = new FormData(form);
//   const dataName = {};
//   formData.forEach((el, key) => dataName[key] = el);
//   return dataName;
// }
//
// function getAuth(evt){
//   evt.preventDefault();
//   const form = evt.currentTarget.dataset.param;
//   const url = ref[form];
//   loadData(url, getFormData(evt.currentTarget), form === 'signIn')
//     .then(res => {
//       form === 'signIn' ? getAnswer(res, signInMessage) : getAnswer(res, signUpMessage, 'зарегистрирован');
//     })
//     .catch(error => console.log(error.message));
// }
//
// forms.forEach(btn => btn.addEventListener('submit', getAuth));
