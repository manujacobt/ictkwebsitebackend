const express=require('express');
const app =  express();

const cors = require('cors');

const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true })); //middleware portion for adding data
app.use(cors());
app.use(express.json());
app.use(express.static('./public'));
app.use('/uploads', express.static('uploads'))


// Route for testimonial starts here
const testimonialRouter = require('./src/routes/testimonial');
app.use('/testimonials',testimonialRouter)
// Route for testimonial ends here

// Route for partner starts here
const partnerRouter = require('./src/routes/partner');
app.use('/partner',partnerRouter)
// Route for partner ends here


















// port listening to starts here//

app.listen(port, () => {
    console.log("Server ready at" + port)
});

// port listening to ends here//