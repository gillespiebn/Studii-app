const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/studii",
  {
    // useMongoClient: true
  }
);

const userSeed = [
  {
    "facebook_id": "9",
    "name": "Hingle McCringleberry",
    "school": "VIRGINIA COMMONWEALTH UNIVERSITY",
    "schoolCode": "003735",
    "email": "hingmcring@vcu.edu",
    "classStanding": "F",
    "classes": [
      "bio:101",
      "math100"
    ],
    "methods": [
      "flashcards", "quizzes", "rereading", "mneumonics", "revision notes", "other"
    ],
    "times": [
      "1morning", "2afternoon", "3evening", "4night", "5morning", "5afternoon", "6evening", "7night"
    ],
    "locations": [
      "coffee shop", "library", "commons", "other", "cafe", "home"
    ],
    "photo": "https://vignette.wikia.nocookie.net/keyandpeele/images/4/4a/IMG_0945.png/revision/latest?cb=20140507072519",
    "major": "Biology"
  },

  {
    "facebook_id": "8",
    "name": "Tyroil Smoochie-Wallace",
    "school": "VIRGINIA COMMONWEALTH UNIVERSITY",
    "schoolCode": "003735",
    "email": "ty@vcu.edu",
    "classStanding": "F",
    "classes": [
      "bio101",
      "math100"
    ],
    "methods": [
      "flashcards", "quizzes", "rereading", "mneumonics", "revision notes", "other"
    ],
    "times": [
      "1morning", "2afternoon", "3evening", "4night", "5morning", "5afternoon", "6evening", "7night"
    ],
    "locations": [
      "coffee shop", "library", "commons", "other", "cafe", "home"
    ],
    "photo": "https://pbs.twimg.com/profile_images/2841709475/55a923e3bbcab0c4d7a46ca087f02cf4_400x400.jpeg",
    "major": "Biology"
  },

  {
    "facebook_id": "7",
    "name": "T.J. A.J. R.J. Backslashinfourth V",
    "school": "VIRGINIA COMMONWEALTH UNIVERSITY",
    "schoolCode": "003735",
    "email": "tjajrj@vcu.edu",
    "classStanding": "F",
    "classes": [
      "bio101",
      "math100",
      "eng100"
    ],
    "methods": [
      "flashcards", "quizzes", "rereading", "mneumonics", "revision notes"
    ],
    "times": [
      "1morning", "2afternoon", "4night", "5morning", "5afternoon", "6evening", "7night"
    ],
    "locations": [
      "coffee shop", "library", "commons", "other", "home"
    ],
    "photo": "https://g.rrrather.com/img/q/168880b.jpg",
    "major": "Math",
    "minor": "Women's Studies"
  },

  {
    "facebook_id": "6",
    "name": "Sequester Grundelplith M.D.",
    "school": "VIRGINIA COMMONWEALTH UNIVERSITY",
    "schoolCode": "003735",
    "email": "tjajrj@vcu.edu",
    "classStanding": "F",
    "classes": [
      "bio101",
      "math100",
      "eng100"
    ],
    "methods": [
      "flashcards", "quizzes", "rereading", "mneumonics", "revision notes"
    ],
    "times": [
      "1morning", "2afternoon", "4night", "5morning", "5afternoon", "6evening", "7night"
    ],
    "locations": [
      "coffee shop", "library", "commons", "other", "home"
    ],
    "photo": "https://yt3.ggpht.com/a-/AJLlDp3kCOOG1s6rfMZ8B2szunJ1MqgJGA8mAZoYiA=s900-mo-c-c0xffffffff-rj-k-no",
    "major": "Math",
    "minor": "Spelling"
  },

  {
    "facebook_id": "5",
    "name": "Donkey Teeth",
    "school": "UNIVERSITY OF RICHMOND",
    "schoolCode": "003744",
    "email": "tjajrj@urich.edu",
    "classStanding": "F",
    "classes": [
      "bio101",
      "math100",
      "eng100"
    ],
    "methods": [
      "flashcards", "quizzes", "rereading", "mneumonics", "revision notes"
    ],
    "times": [
      "1morning", "2afternoon", "4night", "5morning", "5afternoon", "6evening", "7night"
    ],
    "locations": [
      "coffee shop", "library", "commons", "other", "home"
    ],
    "photo": "https://pbs.twimg.com/profile_images/750730202821431296/Nwj9YKkn_400x400.jpg",
    "major": "Philosophy",
    "minor": "Spelling"
  },

  {
    "facebook_id": "4",
    "name": "Decatholac Mango",
    "school": "UNIVERSITY OF RICHMOND",
    "schoolCode": "003744",
    "email": "tjajrj@urich.edu",
    "classStanding": "F",
    "classes": [
      "bio101",
      "math100",
      "eng100"
    ],
    "methods": [
      "flashcards", "quizzes", "rereading", "mneumonics", "revision notes"
    ],
    "times": [
      "1morning", "2afternoon", "4night", "5morning", "5afternoon", "6evening", "7night"
    ],
    "locations": [
      "coffee shop", "library", "commons", "other", "home"
    ],
    "photo": "https://i.ytimg.com/vi/RV6yPi-6sJg/maxresdefault.jpg",
    "major": "Beer",
    "minor": "Weed"
  },

  {
    "facebook_id": "3",
    "name": "Swordless Mimetown",
    "school": "UNIVERSITY OF RICHMOND",
    "schoolCode": "003744",
    "email": "neckbeard@urich.edu",
    "classStanding": "F",
    "classes": [
      "bio101",
      "eng100"
    ],
    "methods": [
      "flashcards", "quizzes", "rereading", "mneumonics", "revision notes"
    ],
    "times": [
      "7night"
    ],
    "locations": [
      "other", "home"
    ],
    "photo": "http://www.bdcwire.com/wp-content/uploads/2015/01/Swordless-Mimetown.png",
    "major": "ESP"
  },

  {
    "facebook_id": "2",
    "name": "Legume Duprix",
    "school": "UNIVERSITY OF RICHMOND",
    "schoolCode": "003744",
    "email": "beandip@urich.edu",
    "classStanding": "S",
    "classes": [
      "bio101"
    ],
    "methods": [
      "flashcards", "quizzes", "rereading", "mneumonics", "revision notes"
    ],
    "times": [
      "1morning", "2afternoon", "4night", "5morning", "5afternoon", "6evening", "7night"
    ],
    "locations": [
      "coffee shop", "library", "commons", "other", "home"
    ],
    "photo": "http://s1.totalprosports.com/wp-content/uploads/2015/01/key-peele-eastwest-bowl-3-aaron-rodgers.png",
    "major": "Why Did I make So Many Of These?"
  },

  {
    "facebook_id": "1",
    "name": "Grunky Peep",
    "school": "UNIVERSITY OF RICHMOND",
    "schoolCode": "003744",
    "email": "grunk@urich.edu",
    "classStanding": "F",
    "classes": [
      "biol101",
      "m100",
      "wri100"
    ],
    "methods": [
      "flashcards"
    ],
    "times": [
      "1morning"
    ],
    "locations": [
      "coffee shop"
    ],
    "photo": "http://www.bdcwire.com/wp-content/uploads/2015/01/Grunky-peep.png",
    "major": "GRUNK"
  },
  {
    "facebook_id": "10",
    "name": "Bismo Funyuns",
    "school": "VIRGINIA COMMONWEALTH UNIVERSITY",
    "schoolCode": "003735",
    "email": "bfunyuns@vcu.edu",
    "classStanding": "F",
    "classes": [
      "bio:101",
      "math100"
    ],
    "methods": [
      "flashcards", "quizzes", "rereading", "mneumonics", "revision notes", "other"
    ],
    "times": [
      "1morning", "2afternoon", "3evening", "4night", "5morning", "5afternoon", "6evening", "7night"
    ],
    "locations": [
      "coffee shop", "library", "commons", "other", "cafe", "home"
    ],
    "photo": "https://i.ytimg.com/vi/_nioio-r47k/maxresdefault.jpg",
    "major": "Women's Studies",
    blockedUsers: ["5ac945a685ac2a4afc3e1b7c"]
  }
]

db.Users
  .remove({})
  .then(() => db.Users.collection.insertMany(userSeed))
  .then(data => {
    console.log(data.insertedIds.length + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
