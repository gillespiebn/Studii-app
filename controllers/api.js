const express = require('express');
const bodyParser = require("body-parser");
let router = express.Router();
const db = require("../models");
const axios = require("axios");

router.get('/allprofiles', (req, res) => {
  db.Users.find({ })
  .then(data => res.json(data)).catch(err => console.log(err));
})

router.post('/matches', (req, res) => {
  // school code
  // time
  // class
  // console.log(req.body.data)
  // console.log(req.body.data.times);
  db.Users
    // .where('schoolCode').equals('req.body.data.schoolCode')
    // .where('schoolCode').equals(req.body.data.schoolCode)
    .find( { schoolCode: req.body.data.schoolCode , _id: { $nin: req.body.data.blockedUsers} } )
    // .where('_id').ne(req.body.data.blockedUsers)
    // .where("_id").nin(req.body.data.blockedUsers)
    .where('times').in(req.body.data.times)
    .where('classes').in(req.body.data.classes)
    .then(data => res.json(data)).catch(err => console.log(err));
    //mongodb selecors or query operators
    // .find({ "times": {$in: req.body.data.times}, "schoolCode": req.body.data.schoolScool }).all(data => {
    //     console.log(data);
    //   })
  });

router.get('/userprofile/:fbID', (req, res) => {
  const user = req.params.fbID
  db.Users.find({ facebook_id: req.params.fbID })
    .then(data => {
      let returnObject = {}
      if (!data) {
        returnObject.string = "no data";
      } else {
        returnObject = data;
      }
      res.json(returnObject)
    }).catch(err => console.log(err));
})

router.get('/allschools', (req, res) => {
  db.Schools.find({ })
    .then(data => res.json(data)).catch(err => console.log(err));
})

router.post('/createuser', (req, res) => {
  console.log(req.body.data)
  db.Users.create(req.body.data).then(data => console.log(data)).catch(err => console.log(err));
  res.send("we did shit here");
})


module.exports = router;