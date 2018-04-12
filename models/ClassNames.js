var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ClassNameSchema = new Schema({
  fullName: String,
  abbreviation: String
});
var ClassNames = mongoose.model("ClassName", ClassNameSchema);

module.exports = ClassNames;
