const express = require('express');
let router = express.Router();
const db = require("../models");
const mongoose = require("mongoose");

// Connect to the Mongo DB
// mongoose.Promise = Promise;
// mongoose.connect("mongodb://localhost/react-searcher", {
//   useMongoClient: true
// });

router.use('/api/', require('./api.js'));
router.use('/cookie/', require('./cookie.js'));




module.exports = router;