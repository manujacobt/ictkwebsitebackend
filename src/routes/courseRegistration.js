const express = require('express');
const app = express.Router();

const RegisterCourse = require('../modals/courseRegistration')


//Course Registration form data recieving route

app.post('/courseRegister', async function (req, res) {

    var RegistrationItem = {
        courseId: req.body.courseId,
        courseTitle: req.body.courseTitle,
        name: req.body.name,
        email: req.body.email,
        phoneno: req.body.phoneno,
        employeeStatus: req.body.employeeStatus,
        graduation: req.body.graduation,
        comments: req.body.comments
    }

    await RegisterCourse.find({ 'email': RegistrationItem.email, 'courseId': RegistrationItem.courseId })
        .then(function (cousrseReg) {
            var bexist = false;
            console.log(`fetched from db Email ID - ${RegistrationItem.email}, coursetitle - ${RegistrationItem.courseTitle}`)
            for (var i = 0; i < cousrseReg.length; i++) {
                if ((cousrseReg[i].email == RegistrationItem.email) && (cousrseReg[i].courseId == RegistrationItem.courseId)) {
                    bexist = true;
                }
            };
            if (bexist) {
                console.log(`Email ID is already registered for the course ${RegistrationItem.courseTitle}`);
                res.status(401).send(`Email ID is already registered for the course ${RegistrationItem.courseTitle}`)
            }
            else {
                var Userdata = RegisterCourse(RegistrationItem);
                Userdata.save();
                console.log(`The registered user added is : Email ID - ${RegistrationItem.email}, Course - ${RegistrationItem.courseTitle}`);
                res.status(200).send({ RegistrationItem })
            }
        });
});

//Course Registration data view || to admin
app.get('/registercourseList', async function (req, res) {
    try{
    console.log('registercourseList')
   await RegisterCourse.find().sort({ _id: -1 })
        .then(function (cousrseRegs) {
            res.send(cousrseRegs);
        });
    } catch (err) {
        console.log("error response in registercourseList"+err)
    }
});




module.exports = app;