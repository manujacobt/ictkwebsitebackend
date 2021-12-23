const express = require('express');
const partnerApplicationData = require('../modals/partnerformData');
let partnerformRouter = express.Router();

partnerformRouter.post('/', async function (req, res) { 
console.log(req.body)
    try{
    let item = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        firm: req.body.firm,
        address: req.body.address,
        district: req.body.district,
        officeSpace: req.body.officeSpace,
        report: req.body.report,
        expect: req.body.expect,
        profile: req.body.profile,
        employeeCount: req.body.employeeCount,
        creation_date: new Date(),

    }
    let newPartner = await  partnerApplicationData(item);
    await newPartner.save()
        res.send(true)
    }
    catch {
        res.send(false)
    }
});

module.exports = partnerformRouter;