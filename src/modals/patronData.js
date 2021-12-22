const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://userone:userone@fsd.qrnq0.mongodb.net/ProjectICTK', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Schema = mongoose.Schema;

const patronSchema = new Schema({
  image: String
});

var patronData = mongoose.model('patron', patronSchema);

module.exports = patronData;