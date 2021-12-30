const express = require('express');
let app = express.Router();

const adminSignup = require('../modals/adminSignup');

//add or signup new admin 
app.post('/', async function (req, res) {
  var User = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    add: req.body.add,
    delete: req.body.delete,
    edit: req.body.edit,
    superadmin: req.body.superadmin,
  
  }
  var UserItem = new adminSignup(User);
  await UserItem.save().then(function (data) {
    res.send(true)
  }).catch(function (error) {
    res.send(false)
  });
});


//admin list route
app.get('/AdminList', async function (req, res) {
    try{
   await adminSignup.find().sort({ firstname: -1 })
      .then(function (users) {
        res.send(users);
      });
    }catch(err){
        console.log("error response in AdminList"+err)
    }
  });
  

//Remove a admin from admin DB
app.post('/signup/remove', async (req, res) => {
  console.log(req.body);
  id = req.body._id
  console.log(` inside remove ${id}`);
  await adminSignup.findByIdAndDelete({ '_id': id },
    (err, result) => {
      if (err) {
        res.send(false)
      } else {
        res.send(true)
      }
    });
});

//Update admin data
app.post('/signup/update', async (req, res) => {


  let item = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    add: req.body.add,
    delete: req.body.delete,
    edit: req.body.edit,
    superadmin: req.body.superadmin,
  }

  let id = req.body._id;
  let updateUser = { $set: item };
 await adminSignup.findByIdAndUpdate({ "_id": id }, updateUser)
    .then((respond) => {
      if (respond) {
        console.log('Admin Credential succesfully updated')
        res.send(true)
      }
      else {
        console.log('Connection error', error)
        res.send(false)
      }
    });
});


module.exports = app;