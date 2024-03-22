const express = require('express');
const {  orgController} = require('./../controller/orgController');
const passport = require('passport');
// const upload = require('./../middlewares/multer')

const router = express.Router();


//user auth routes
router.post("/signup", orgController.signup);
router.post("/signin", orgController.signin);

//testing route
router.get("/protected", passport.authenticate('jwt', { session: false }),(req,res)=>{
    res.send(req.user)
})


module.exports = router;