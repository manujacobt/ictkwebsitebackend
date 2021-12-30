const express = require('express');
const knowledgepartneradminRouter = express.Router();
const knowledgepartnerData = require('../../modals/knowledgepartnerData');
const fs = require('fs');

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




/* check cpUpload */
knowledgepartneradminRouter.post('/', cpUpload, async (req, res) => {
  try{
  var item = {
   
    image: req.files?.image[0].path,    
    
  };
  await knowledgepartnerData.create(item);
  res.send(true);  
}
catch{
  res.send(false);
}
});

knowledgeadminRouter.delete('/remove/:id',async (req,res)=>{
  try{
 id = req.params.id;
 await knowledgeData.findById({"_id":id})
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

module.exports = knowledgepartneradminRouter;
