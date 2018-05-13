const driver = require('bigchaindb-driver');

module.exports = class WeatherStation {
    constructor(_elevation, _id, _latitude, _longitude, _name, _region, _unitaryAuthArea) {
        this.elevation = _elevation;
        this.id = _id;
        this.latitude = _latitude;
        this.longitude = _longitude;
        this.name = _name;
        this.region = _region;
        this.unitaryAuthArea = _unitaryAuthArea;
        this.assetId = null;
    }

    async register(connection, ownerKeyPair) {
        console.log(this);
        let registerTx = driver.Transaction.makeCreateTransaction(
            this._toAsset(),
            null,

            // A transaction needs an output
            [ driver.Transaction.makeOutput(
                driver.Transaction.makeEd25519Condition(ownerKeyPair.publicKey))
            ],
            ownerKeyPair.publicKey
        );

        let signedRegisterTx = driver.Transaction.signTransaction(registerTx, ownerKeyPair.privateKey);
        console.log('about to create the asset');
        try {
            let result = await connection.postTransactionCommit(signedRegisterTx);
            console.log('created the asset');
            console.log('the result: ', result);
            console.log('the signed tx: ', signedRegisterTx);
            this.assetId = signedRegisterTx.id;
        } catch (e) {
            console.log(e)
        }

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