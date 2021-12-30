const express = require('express');
const StaffData = require('../../modals/staffData');
let app = express.Router();

app.get('/', async function (req, res) {
    await StaffData.find()
        .then(function (staff) {
            res.render('editstaff',{staff});
        })
});

module.exports = app;