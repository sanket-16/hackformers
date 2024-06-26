const express = require('express');
const { announmentController } = require('../controller/announcementController');
const passport = require('passport');

const router = express.Router()

router.post('/create',passport.authenticate('jwt', { session: false }),announmentController.createAnnouncment)
router.get('/getAnnouncement/:eventId',passport.authenticate('jwt', { session: false }),announmentController.getAnnouncement)

module.exports = router

