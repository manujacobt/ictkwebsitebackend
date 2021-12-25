const express = require('express');
const academicadminRouter = express.Router();
const patronData = require('../modals/patronData');


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
academicadminRouter.post('/', cpUpload, async (req, res) => {
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
module.exports = academicadminRouter;
