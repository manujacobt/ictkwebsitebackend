const mongoose= require('mongoose');

mongoose.connect('mongodb+srv://ictakoffial2021:ictakoffial2021@ictak-official-webdb.vtyb5.mongodb.net/ICTofficialproject', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}); 


const Schema = mongoose.Schema;

const TestimonialSchema = new Schema({
    course_id               : String,
    course_title            : String,
    name                    : String,
    position                : String,
    organisation            : String,
    testimony               : String,
    image                   : String
});

var TestimonialData = mongoose.model('testimonial',TestimonialSchema);

module.exports = TestimonialData;