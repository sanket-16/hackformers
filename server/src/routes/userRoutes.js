const express = require('express');
const { authController} = require('./../controller/userController');
const passport = require('passport');
// const upload = require('./../middlewares/multer')

const router = express.Router();


//user auth routes
router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
router.get("/protected", passport.authenticate('jwt', { session: false }),(req,res)=>{
    res.send(req.user)
})


module.exports = router;