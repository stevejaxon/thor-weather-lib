require('dotenv').load();
const WeatherStation = require('./weatherStation');
const WeatherData = require('./weatherData');
const Credentials = require('./credentials');

const BIGCHAINDB_HOST = process.env.BIGCHAINDB_HOST || 'localhost';
const BIGCHAINDB_PORT = process.env.BIGCHAINDB_PORT || '9984';
const API_PATH = 'http://' + BIGCHAINDB_HOST + ':' + BIGCHAINDB_PORT + '/api/v1/';
const BIGCHAINDB_WEATHER_STATION_ID = process.env.BIGCHAINDB_WEATHER_STATION_ID;
const credentials = new Credentials();

const station = new WeatherStation(API_PATH, 25.0, 3772, 51.479, -0.449, "Heathrow", "se", "Greater London", BIGCHAINDB_WEATHER_STATION_ID);
//return station.register(credentials.keyPair);
//return conn.searchAssets('e63a2b5eb03954cc6e6920a823f8ac7195eb20715c81e5ab7931aae57ff393dd').then(d => console.log(d));
const data = new WeatherData(Date.now(), "14", "11", "NW", "4", "51", "14", "VG", "4", "900", "0");
return station.recordReadings(credentials.keyPair, data)
    .then(() => {
        station.getAllWeatherDataReadings();
    });
