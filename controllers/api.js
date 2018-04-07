const express = require('express');
const bodyParser = require("body-parser");
let router = express.Router();
const db = require("../models");
const axios = require("axios");

router.get('/allprofiles', (req, res) => {
  db.Users.find({ })
  .then(data => res.json(data)).catch(err => console.log(err));
})


module.exports = router;