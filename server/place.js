const mongoose = require('mongoose');

const PlaceSchema = mongoose.Schema({
    name: {
        type: String
    },
    location: {
        type: String
    },
    rent: {
        type: Number
    },
    available: {
        type: Boolean
    },
    owner_id: {
        type: String
    },
    preview: {
        type: String
    },
    door: {
        type: String
    }
});

const Place = module.exports = mongoose.model('Place', PlaceSchema);

module.exports.getPlaces = function(callback) {
    Place.find(callback);
}

module.exports.getPlace = function(id, callback) {
    Place.findById(id, callback);
}

module.exports.blockPlace = function(id, callback) {
    Place.findByIdAndUpdate(id, {available: false}, callback);
}

module.exports.freePlace = function(id, callback) {
    Place.findByIdAndUpdate(id, {available: true}, callback);
}