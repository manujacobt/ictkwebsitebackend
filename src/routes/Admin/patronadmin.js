const express = require('express');
const patronadminRouter = express.Router();
const patronData = require('../../modals/patronData');
const fs = require('fs');

/* multer start */
const multer = require('multer');
const res = require('express/lib/response');


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




/* check cpUpload */
patronadminRouter.post('/add', cpUpload, async (req, res) => {
  try{
  var item = {
   
    image: req.files?.image[0].path,    
    
  };
  await patronData.create(item);
  res.send(true);  
}
catch{
  res.send(false);
}
});

patronadminRouter.delete('/remove/:id',async (req,res)=>{
  try{
 id = req.params.id;
 await patronData.findById({"_id":id})
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

module.exports = patronadminRouter;
