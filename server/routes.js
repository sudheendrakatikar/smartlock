const express = require('express');
const router = express.Router();
const Place = require('./place');

//show places
router.get('/places', function(req, res) {
    Place.getPlaces(function(err, places) {
        if (err) throw err;
        res.json(places);
    });
});

//show place
router.get('/place/:id', function(req, res) {
    Place.getPlace(req.params.id, function(err, place) {
        if (err) throw err;
        res.json(place);
    });
});

//block place
router.get('/block/:id', function(req, res) {
    Place.blockPlace(req.params.id, function(err, block) {
        if (err) throw err;
        res.json(block);
    });
});

//free place
router.get('/free/:id', function(req, res) {
    Place.freePlace(req.params.id, function(err, free) {
        if (err) throw err;
        res.json(free);
    });
});

module.exports = router;