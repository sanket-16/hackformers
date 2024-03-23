const express = require('express');
const { eventController } = require('./../controller/eventController');
const passport = require('passport');


const router = express.Router();

router.post("/create", passport.authenticate('jwt', { session: false }), eventController.createEvent);
router.post("/addUsertoEvent/:eventId",passport.authenticate('jwt', { session: false }),eventController.updateUserinEvent);
router.get("/getEvent/:id", passport.authenticate('jwt', { session: false }),eventController.getEvent);
router.put("/updateStatus/:id",passport.authenticate('jwt', { session: false }),eventController.updateStatus);
router.put("/addParticipants/:eventId",passport.authenticate('jwt', { session: false }),eventController.addParticipants);
router.get("/userCreatedEvents",passport.authenticate('jwt', { session: false }),eventController.userCreatedEvents);
router.get("/orgEvents",passport.authenticate('jwt', { session: false }),eventController.eventAccordingOrg)

module.exports = router;