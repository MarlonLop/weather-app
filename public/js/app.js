console.log('Client side JS file is loaded');

const weatherForm = document.querySelector('form');
const getWeather = document.querySelector('input');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const location = getWeather.value

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                console.log(data.error);
            } else {
                console.log(data.location, data.forecast);
            }
        });
    });
});