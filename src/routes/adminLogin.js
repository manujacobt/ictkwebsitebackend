const express = require('express');
let app = express.Router();
const jwt = require('jsonwebtoken');
const adminData = require('../modals/adminSignup');




app.post('/', async function (req, res) {

    let email = req.body.email;
    let password = req.body.password;
    console.log(req.body)

    // mongo check for user
  await adminData.findOne({ email: email, password: password }, function (err, user) {
        if (err) {
            console.log("admin login failed")

            res.send({ status: false, data: 'Response error.' });
        }
        else if (user) {

            adminData.findOne({ email: req.body.email })
                .then(function (userdata) {
                    var user = userdata;
                });


            console.log("local user login success")
            let payload = { subject: email + password }
            let token = jwt.sign(payload, 'secretKey')
            res.send({ status: true, token, user })

            console.log({ status: true, token, user })
        } else {
            res.send({ status: false, data: 'NOT FOUND' });
        }
    });
});



module.exports = app;