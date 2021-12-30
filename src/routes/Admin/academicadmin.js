const express = require('express');
const academicData = require('../../modals/academicData');

let academicadminRouter = express.Router();

academicadminRouter.post('/', async function (req, res) {
console.log(req.body)
try{
    let item = {

        slno: req.body.slno,
        membid: req.body.membid,
        name: req.body.name,
        website: req.body.website,       
        creation_date: new Date(),
    }
    let newacademic = await academicData(item);
   
   await newacademic.save()
        res.send(true)
    }
    catch {
        res.send(false)
    }

});

academicadminRouter.delete('/remove/:id',async (req,res)=>{
    try{
   id = req.params.id;
   await academicData.findById({"_id":id})
   .then((indus)=>{
        indus.remove()   
       res.send(true);
   })  
  }
  catch{
   res.send(false);
  } 
  })


module.exports = academicadminRouter;