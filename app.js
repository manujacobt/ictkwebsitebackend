const express=require('express');
const app =  express();

const cors = require('cors');

const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true })); //middleware portion for adding data
app.use(cors());
app.use(express.json());
app.use(express.static('./public'));
app.use('/uploads', express.static('uploads'))

const methodoverride = require('method-override');
app.use(methodoverride('_method'));

app.set('view engine', 'ejs');
app.set('views', './src/views');
app.get('/', function (req, res) {
    res.render('index' )
})




// Route for testimonial in home page starts here
const hometestimonialRouter = require('./src/routes/hometestimonial');
app.use('/hometestimonials',hometestimonialRouter)
// Route for testimonial for home page ends here

// Route for patrons starts here
const patronRouter = require('./src/routes/patron');
app.use('/patrons',patronRouter)
// Route for patrons ends here

// Route for Industrial partners starts here
const industrypartnerRouter = require('./src/routes/industrypartner');
app.use('/industry',industrypartnerRouter)
// Route for Industrial partners ends here

// Partner application form route starts here
const partnerformRouter = require('./src/routes/partnerForm');
app.use('/PartnershipApplication', partnerformRouter);
// Partner application form starts route here

// corporate application form routestarts here
const corporateformRouter = require('./src/routes/corporateform');
app.use('/CorporateApplication', corporateformRouter);
// corporate application form route ends here

// academic page route starts here
const academicRouter = require('./src/routes/academicMembership');
app.use('/academic', academicRouter);
// academic page route  ends here







// ADMIN STARTS HERE

// patrons admin adding patrons starts here 
const patronadminRouter = require('./src/routes/patronadmin');
app.use('/patronadmin', patronadminRouter);
// patrons admin adding patrons ends here 

// patrons admin adding patrons starts here 
const industrypartneradminRouter = require('./src/routes/industrialpartneradmin');
app.use('/industrypartneradmin', industrypartneradminRouter);
// patrons admin adding patrons ends here 

// academic admin adding colleges starts here
const academicadminRouter = require('./src/routes/academicadmin');
app.use('/academicadmin', academicadminRouter);
// academic admin adding colleges ends here















// port listening to starts here//

app.listen(port, () => {
    console.log("Server ready at" + port)
});

// port listening to ends here//