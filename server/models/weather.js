const request = require('request-promise');

const WEATHER_API_KEY = '6667ab05790995d40ef987670333fbee';

class Weather {
    static retrieveByCity(city, callback) {
        request({
            url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${WEATHER_API_KEY}`,
            json: true
        }).then(function (res) {
            callback(res);
        }).catch(function (err) {
            console.log(err);
            callback({ error: 'Could not reach OpenWeatherAPI.'});
        });
    }
}

module.exports = Weather;