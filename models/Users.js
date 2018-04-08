var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UsersSchema = new Schema({
  facebook_id: {
    type: String,
    unique: "This thingy is already in here",
    // required: true
  },
  name: {
    type: String,
    required: true
  },
  school: {
    type: String,
    required: true
  },
  schoolCode: { 
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  classStanding: {
    type: String,
    required: true
  },
  classes: [],
  methods: [],
  times: [],
  locations: [],
  photo: String,
  major: {
    type: String,
    required: true
  },
  minor: String,
  blockedUsers: []
});
var Users = mongoose.model("Users", UsersSchema);

module.exports = Users;
