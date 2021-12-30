const express = require('express');
const eventsData = require('../../modals/eventsData');
let eventsRouter = express.Router();

eventsRouter.get('/', async function (req, res) {
    
   
         eventsData.find()
        .then(function (events) {
            res.render('events', {events});
        })
  
});

module.exports = eventsRouter;