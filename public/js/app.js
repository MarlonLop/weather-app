console.log('Client side JS file is loaded');

const weatherForm = document.querySelector('form');
const getWeather = document.querySelector('input');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const location = getWeather.value
    message1.textContent ='Fetching weather...';
    message2.textContent ='';

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                message1.textContent = data.error;
            } else {
                message1.textContent = data.location;
                message2.textContent = data.forecast;
            }
        });
    });
});