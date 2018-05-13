require('dotenv').load();
const driver = require('bigchaindb-driver');
const Credentials = require('./credentials');
const WeatherStation = require('./weatherStation');
const BIGCHAINDB_HOST = process.env.BIGCHAINDB_HOST || 'localhost';
const BIGCHAINDB_PORT = process.env.BIGCHAINDB_PORT || '9984';
const API_PATH = 'http://' + BIGCHAINDB_HOST + ':' + BIGCHAINDB_PORT + '/api/v1/';

const conn = new driver.Connection(API_PATH);
const credentials = new Credentials();

const station = new WeatherStation(25.0, 3772, 51.479, -0.449, "Heathrow", "se", "Greater London");
return station.register(conn, credentials.keyPair);

