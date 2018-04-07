var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SchoolsSchema = new Schema({
    code: {
        type: String,
        unique: "This thingy is already in here",
        // required: true
    },
    name: {
        type: String,
        required: true
    },
    street: {
        type: String
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    },
    primaryColor: {
        type: String,
        default: "#22223B",
        required: true
    },
    secondaryColor: {
        type: String,
        default: "#F4AE9F",
        required: true
    },
    logo: {
        type: String,
        default: "../../public/images/school-logo.gif",
        required: true
    }
});
var Schools = mongoose.model("Schools", SchoolsSchema);

module.exports = Schools;
