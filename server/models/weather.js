const request = require('request-promise');

require('dotenv').config();

class Weather {
    static retrieveByCity(city, callback) {
        request({
            url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${process.env.WEATHER_API_KEY}&units=metric`,
            json: true
        }).then(function (res) {
            callback(res);
        }).catch(function (err) {
            console.log(err);
            callback({ error: 'Sorry, could not reach OpenWeatherAPI.'});
        });
    }
}

module.exports = Weather;