const express = require('express');
const app = express.Router();
const multer = require('multer');
const TestimonyData = require('../modals/testimonialData')
var fs = require('fs');

// Configure Storage for image upload using Multer
var storage = multer.diskStorage({

    // Setting directory on disk to save uploaded files
    destination: function (req, file, cb) {
        cb(null, './uploads/courseTestimony')
    },

    // Setting name of file saved
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.' + fileExtension(file.originalname))
    }
})

var upload = multer({
    storage: storage,
    limits: {
        // Setting Image Size Limit to 2MBs
        fileSize: 2000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            //Error 
            cb(new Error('Please upload JPG and PNG images only!'))
        }
        //Success 
        cb(undefined, true)
    }
})



//Course testimonies ||to admin 

app.get('/', function (req, res) {

    TestimonyData.find().sort({ index: 1 })
        .then(function (testimonials) {
            res.send(testimonials);
        });
});


//Course testimony route
app.get('/courseTestimony/:id', async (req, res) => {
    try{
    const id = req.params.id;
    await TestimonyData.find({ "course_id": id })
        .then((testimonials) => {
            res.send(testimonials);
        });
    } catch (err) {
        console.log("error response in CourseTestinomy"+err)
    }
})

//Add Testimony ||to admin

app.post('/courseTestimony/add',upload.single('image'), async function (req, res) {
    var testimonial = {

        name: req.body.name,
        position: req.body.position,
        organisation: req.body.organisation,
        testimony: req.body.testimony,
        courseTitle: req.body.courseTitle,
        image: req.file.filename,
    }


    var testimonial = new TestimonyData(testimonial);
    await testimonial.save().then(function (data) {
        res.send(true)
    }).catch(function (error) {
        res.send(false)
    });

});

//Delete Testimony ||to admin
app.post('/courseTestimony/remove',async (req, res) => {
    console.log(req.body);
    id = req.body._id
    console.log(` inside deleted ${id}`);
    const data = await TestimonyData.findByIdAndDelete({ '_id': id },
    fs.unlink(data.image,(err => {
            if (err) {
                res.send(false)
            } else {
                res.send(true)
            }
        })));
});

//Update/edit Testimony
app.post('/testimonial/update',upload.single('image'), (req, res) => {

    var item = {
        name: req.body.name,
        position: req.body.position,
        organisation: req.body.organisation,
        testimony: req.body.testimony,
        courseTitle: req.body.courseTitle,
        image: req.file.filename
    }

    let _id = req.body._id;
    let updated = { $set: item };

    TestimonyData.findByIdAndUpdate({ _id: _id }, updated)
        .then((respond) => {
            if (respond) {
                console.log('Successfully Updated and saved to DB')
                res.send(true)
            }
            else {
                console.log('update failed,try again', error)
                res.send(false)
            }
        });

});



module.exports = app;