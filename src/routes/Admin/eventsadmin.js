const express = require('express');
const eventsData = require('../../modals/eventsData');
const fs = require('fs')

let eventsadminRouter = express.Router();

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


eventsadminRouter.post('/add', cpUpload, async function (req, res) {
    console.log(req.body)
    try{
        let item = {
    
            coursename: req.body.coursename,
            regstatus:req.body.regstatus,
            fees: req.body.fees,
           agenda: req.body.agenda,
           objectives:req.body.objectives,
            startdate: req.body.startdate,       
            enddate: req.body.enddate,
            image: req.files?.image[0].path,           
            creation_date: new Date(),
        }
        let newevents = await eventsData(item);
       
       await newevents.save()
            res.send(true)
        }
        catch {
            res.send(false)
        }
    
    });

    eventsadminRouter.delete('/remove/:id',async (req,res)=>{
        try{
       id = req.params.id;
       await eventsData.findById({"_id":id})
       .then((indus)=>{
           console.log(indus.image);
           fs.unlinkSync(indus.image);     
           indus.remove()   
           res.send(true);
       })  
     }
     catch{
       res.send(false);
     } 
     })
    
    module.exports = eventsadminRouter;