const express = require('express');
let app = express.Router();

const StaffData = require('../../modals/staffData');

const fs = require('fs')


/* multer start */
const multer = require('multer');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${+Date.now()}.${file.originalname.split('.')[1]}`
    );
  }
});

const upload = multer({ storage: storage });
const cpUpload = upload.fields([
   { name: 'image', maxCount: 1 }
]);
/* multer end */




app.put('/updateIndex', (req, res) => {


    id = req.body._id;
    title = req.body.name;
    index = req.body.index;
    console.log(`update of ${title} with value ${index}`);
    StaffData.findByIdAndUpdate({ "_id": id },
        { $set: { "index": index } })
        .then(function () {
            res.send(true);
        })

});

app.post('/insert', function (req, res) {

    var staff = {
        name: req.body.name,
        designation: req.body.designation,
        about: req.body.about,
        image: req.body.image,

    }
    var staffItem = new StaffData(staff);
    staffItem.save().then(function (data) {
        res.send(true)
    }).catch(function (error) {
        res.send(false)
    });

});

//deleting staff data
app.delete('/remove/:id', (req, res) => {
    console.log(req.body);
    id = req.params.id
    console.log(` inside remove ${id}`);
    StaffData.deleteOne({ '_id': id })
        .then(function (staff) {
            console.log('success')
            res.send(true);
        });

});
///updating staff 
app.put('/update', (req, res) => {

    var item = {
        name: req.body.name,
        designation: req.body.designation,
        about: req.body.about,
        image:  req.files?.image[0].path 
    }

    

    let id = req.body._id;
    let updateT = { $set: item };


    StaffData.findByIdAndUpdate({ _id: id }, updateT)
        .then((respond) => {
            if (respond) {
                console.log('mongoDb updated successfully for Course')
                res.send(true)
            }
            else {
                console.log('mongoDb update error', error)
                res.send(false)
            }
        });

});

module.exports = app;


