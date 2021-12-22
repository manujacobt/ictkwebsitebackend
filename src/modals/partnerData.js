const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://userone:userone@fsd.qrnq0.mongodb.net/ProjectICTK', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Schema = mongoose.Schema;

const PartnerSchema = new Schema({
  image: String
});

var PartnerData = mongoose.model('partner', PartnerSchema);

module.exports = PartnerData;