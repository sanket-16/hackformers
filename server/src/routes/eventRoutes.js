const express = require('express');
const { eventController } = require('./../controller/eventController');
const passport = require('passport');


const router = express.Router();

router.post("/create", passport.authenticate('jwt', { session: false }), eventController.createEvent);

module.exports = router;