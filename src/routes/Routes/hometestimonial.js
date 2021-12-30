const express = require('express');
const TestimonialData = require('../../modals/TestimonialData');
let testimonialRouter = express.Router();

testimonialRouter.get('/', function (req, res) {
    TestimonialData.find()
        .then(function (test1) {
            res.send(test1);
        })
});

module.exports = testimonialRouter;