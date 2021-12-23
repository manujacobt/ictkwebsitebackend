const express=require('express');
const app =  express();

const cors = require('cors');

const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true })); //middleware portion for adding data
app.use(cors());
app.use(express.json());
app.use(express.static('./public'));
app.use('/uploads', express.static('uploads'))

app.set('view engine', 'ejs');
app.set('views', 'views');


// Route for testimonial starts here
const testimonialRouter = require('./src/routes/testimonial');
app.use('/testimonials',testimonialRouter)
// Route for testimonial ends here

// Route for patrons starts here
const patronRouter = require('./src/routes/patron');
app.use('/patrons',patronRouter)
// Route for patrons ends here

// Route for Industrial partners starts here
const industrypartnerRouter = require('./src/routes/patron');
app.use('/industry',industrypartnerRouter)
// Route for Industrial partners ends here

// Partner application form starts here
const partnerformRouter = require('./src/routes/partnerForm');
app.use('/PartnershipApplication', partnerformRouter);
// Partner application form starts here

















// port listening to starts here//

app.listen(port, () => {
    console.log("Server ready at" + port)
});

// port listening to ends here//