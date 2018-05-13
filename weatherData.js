module.exports = class WeatherData {
    constructor(_feelsLikeTemperature, _windGust, _windDirection, _windSpeed, _screenRelativeHumidity, _temperature, _visibility, _maxUVIndex, _weatherType, _precipitationProbability) {
        this.feelsLikeTemperature = _feelsLikeTemperature;
        this.windGust = _windGust;
        this.windDirection = _windDirection;
        this.windSpeed = _windSpeed;
        this.screenRelativeHumidity = _screenRelativeHumidity;
        this.temperature = _temperature;
        this.visibility = _visibility;
        this.maxUVIndex = _maxUVIndex;
        this.weatherType = _weatherType;
        this.precipitationProbability = _precipitationProbability;
    }
};