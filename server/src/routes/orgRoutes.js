const express = require('express');
const {  orgController, organizationController} = require('./../controller/orgController');
const passport = require('passport');


const router = express.Router();


//user auth routes
router.post("/signup", orgController.signup);
router.post("/signin", orgController.signin);
router.get("/getUser", passport.authenticate('jwt', { session: false }),orgController.getOrg);

//testing route
router.get("/protected", passport.authenticate('jwt', { session: false }),(req,res)=>{
    res.send(req.user)
})

//Organization Routes
router.post("/createOrg",passport.authenticate('jwt', { session: false }),organizationController.createOrganization);
router.post("/addOrganizer/:organizationId",passport.authenticate('jwt', { session: false }),organizationController.addOrganizerToOrganization)
router.get("/getOrganization/:organizationId",organizationController.getOrganization)
router.get("/getOrganizations",organizationController.showAllOrgs);

module.exports = router;