// TODO figure out how to do this correctly
const Orm = require('bigchaindb-orm').default;

module.exports = class WeatherStation extends Orm {
    constructor(apiUrl, _elevation, _id, _latitude, _longitude, _name, _region, _unitaryAuthArea, _assetId) {
        super(apiUrl);
        this.elevation = _elevation;
        this.id = _id;
        this.latitude = _latitude;
        this.longitude = _longitude;
        this.name = _name;
        this.region = _region;
        this.unitaryAuthArea = _unitaryAuthArea;
        this.assetId = _assetId;
        this.define("myModel", "https://schema.org/v1/myModel");
    }

    async register(ownerKeyPair) {
        if(this.assetId) {
            let asset = await this.models.myModel.create({
                keypair: ownerKeyPair,
                data: this._toAsset()
            });
            this.assetId = asset.id;
        }
    }

    async recordReadings(ownerKeyPair, weatherData) {
        let asset = await this._getAsset();
        let result = await assets.append({
            toPublicKey: ownerKeyPair.publicKey,
            keypair: ownerKeyPair,
            data: weatherData
        });
    }

    async getAllWeatherDataReadings() {
        let asset = await this._getAsset();
        console.log(asset);
    }

    async _getAsset() {
        let assets = await this.models.myModel.retrieve(this.assetId);
        return assets[0];
    }

    _toAsset() {
        return {
            'id': this.id,
            'name': this.name,
            'elevation': this.elevation,
            'latitude': this.latitude,
            'longitude': this.longitude,
            'region': this.region,
            'unitaryAuthArea': this.unitaryAuthArea
        }
    }
};