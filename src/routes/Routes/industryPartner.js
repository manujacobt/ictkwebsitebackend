const express = require('express');
const industrypartnerData = require('../../modals/industrypartnerData');
let industrypartnerRouter = express.Router();

industrypartnerRouter.get('/', async function (req, res) {
    
   
         industrypartnerData.find()
        .then(function (industrypartners) {
            console.log(industrypartners)
            res.render('index2', {industrypartners});
        })
  
});

module.exports = industrypartnerRouter;