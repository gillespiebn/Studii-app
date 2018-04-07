const express = require('express');
const bodyParser = require("body-parser");
let router = express.Router();
const db = require("../models");
const axios = require("axios");

router.get('/allprofiles', (req, res) => {
  db.Users.find({ })
  .then(data => res.json(data)).catch(err => console.log(err));
})

router.get('/matches', (req, res) => {
  // school code
  // time
  // class

  db.Users
    .where('schoolCode').equals(req.body.schoolCode)
    .where('times').in(req.body.times)
    .where('classes').in(req.body.classesQueryString);
    //change data structure for classes!!!!!! if this comment isn't deleted, then the data structure is still wrong
    //mongodb selecors or query operators
    // .find({ "times": {$in: req.body.times}, "schoolCode": req.body.schoolScool }).all(data => {
});

module.exports = router;