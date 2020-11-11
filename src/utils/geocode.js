const request = require('request');
const token = require('../../.tokens.bin');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + 
                '.json?access_token=' + token.geoToken + '&limit=1';

    // { url, json: true } is equal to { url:url, json: true } because of es6 shorthand feature for object properties
    // { body } is object destructuring from ( response ) object
    request({ url, json: true }, (error, { body }) => { 
        if(error){
            callback('No connection to location services', undefined);
        } else if(body.features.length === 0) {
            callback('No matching location found, try another', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1], 
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
}

module.exports = geocode;