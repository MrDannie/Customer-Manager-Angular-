const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId;

const StateSchema = new Schema({
  name         : { type :  String, required: true, trim: true },
  abbreviation : { type : String },

});

module.exports = mongoose.model('State', StateSchema);

