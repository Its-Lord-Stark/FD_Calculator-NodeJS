const express = require("express");
const { loginController, registerController,  fdDataCalculator} = require("../controllers/userController");


const router = express.Router();


router.get('/login', (req,res)=>{
    res.render("login");
})

router.get('/home', (req,res)=>{
    res.render("home");
})

router.post('/login', loginController);

router.get('/register', (req,res)=>{
    res.render("register")});

router.post('/register', registerController);


router.post('/calculatefd', fdDataCalculator)



module.exports = router;