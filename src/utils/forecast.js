const request = require('request');
const token = require('../.tokens.bin');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=' + token.weatherToken + '&query=' + 
                latitude + ',' + longitude + '&units=f';

    // { url, json: true } is equal to { url:url, json: true } because of es6 shorthand feature for object properties
    // { body } is object destructuring from ( response ) object
    request({ url: url, json: true }, (error, { body }) => { 
        if(error) {
            callback('No connection to weather service', undefined);
        } else if(body.error){
            callback(('Location not found'), undefined);
        } else {
            callback(undefined, body.current.weather_descriptions[0] + 
                                 '. it is currently ' +  body.current.temperature + 
                                ' degrees out and it feels like ' + body.current.feelslike + ' degrees');
        }
    });
}

module.exports = forecast;