const express = require('express');
const PartnerData = require('../modals/PartnerData');
let partnerRouter = express.Router();

partnerRouter.get('/', async function (req, res) {
    
    try { 
        await PartnerData.find()
        .then(function (partner) {
            res.send(partner);
        })
    }
    catch{
console.log("error fetching partners")
    }
});

module.exports = partnerRouter;