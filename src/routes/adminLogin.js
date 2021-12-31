const express = require('express');
let app = express.Router();
const jwt = require('jsonwebtoken');
const adminData = require('../modals/adminSignup');
const bcrypt = require('bcrypt');


app.post('/', async function (req, res) {

    let email = req.body.email;
    let password = req.body.password;
    console.log(req.body)

    // mongo check for user
 let user= await adminData.findOne({'email': email})
 console.log(user);

 bcrypt.compare(password,user.password)
 .then((status)=>{
     if(status){
        res.send(true);
     }
     else{
         res.send(false);
     }  
    }) 
});



module.exports = app;