const mongoose= require('mongoose');

mongoose.connect('mongodb+srv://ictakoffial2021:ictakoffial2021@ictak-official-webdb.vtyb5.mongodb.net/ICTofficialproject', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    courseTitle            : String,
    courseImage            : String,
    shortDesc              : String,
    LongDes                : String,
    Reg_Status             : Number,
    Objectives             : String,
    Rating                 : Number,
    dates                  : String,
    aptitude_test          : String,
    eligibility            : String,
    course_Agenda          : String,
    course_fee             : String,
    course_delivery        : String,
    internship_partner     : String,
    knowledge_partner      : String,
    index                  : Number,
    active                 : Boolean 
});    

var Coursedata = mongoose.model('coursedata',CourseSchema);

module.exports = Coursedata;