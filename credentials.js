require('dotenv').load();
const driver = require('bigchaindb-driver');
const bip39 = require('bip39');

const BIP39_MNEMONIC = process.env.BIP39_MNEMONIC;

module.exports = class Credentials {
    constructor() {
        let _keyPair;
        if (BIP39_MNEMONIC) {
            _keyPair = new driver.Ed25519Keypair(bip39.mnemonicToSeed(BIP39_MNEMONIC).slice(0, 32));
        } else {
            _keyPair = new driver.Ed25519Keypair();
        }
        this.keyPair = _keyPair;
    }
};