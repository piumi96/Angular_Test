const keys = require('./keys');
const api = require('marvel-api');

var marvel = api.createClient({
    publicKey: keys.marvel.publicKey,
    privateKey: keys.marvel.privateKey
});

module.exports = marvel;