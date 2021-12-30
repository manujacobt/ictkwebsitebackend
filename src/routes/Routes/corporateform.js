const express = require('express');
const corporateApplicationData = require('../../modals/corporateformData');
let corporateformRouter = express.Router();

corporateformRouter.post('/', async function (req, res) {

try{
    let item = {

        name: req.body.name,
        address: req.body.address,
        website: req.body.website,
        head: req.body.head,
        nature: req.body.nature,
        typeof: req.body.typeof,
        identityNo: req.body.identityNo,
        GST: req.body.GST,
        nameofContact: req.body.nameofContact,
        phone: req.body.phone,
        email: req.body.email,
        TechnicalSkill: req.body.TechnicalSkill,
        employeeCount: req.body.employeeCount,
        hire: req.body.hire,
        patents: req.body.patents,
        collaborate: req.body.collaborate,
        details: req.body.details,
        creation_date: new Date(),
    }
    let newcorporate = await corporateApplicationData(item);
    console.log("backend", item)
   await newcorporate.save()
        res.send(true)
    }
    catch {
        res.send(false)
    }

});

module.exports = corporateformRouter;