const request = new XMLHttpRequest();

request.addEventListener('load', onload);

request.open('GET', 'https://netology-fbb-store-api.herokuapp.com/weather');

request.send();

function onload() {
  if (request.status === 200) {
    const response = JSON.parse(request.responseText);
    setData(response);
  };
};
