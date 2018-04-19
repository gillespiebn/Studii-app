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
    "name": "Rosanna Pansino",
    "school": "VIRGINIA COMMONWEALTH UNIVERSITY",
    "schoolCode": "003735",
    "email": "pansinoro@vcu.edu",
    "classStanding": "Freshman",
    "classes": [
      "Biology:101",
      "Math:101",
      "English:101"
    ],
    "methods": [
      "flashcards", "quizzes", "rereading", "mnemonics", "notes", "other"
    ],
    "times": [
      "SundayMorning", "MondayAfternoon", "TuesdayEvening", "WednesdayNight", "ThursdayMorning", "ThursdayAfternoon", "FridayEvening", "SaturdayNight"
    ],
    "locations": [
      "online", "library", "commons", "other", "cafe", "home"
    ],
    "photo": "http://i64.tinypic.com/2hqf4gm.jpg",
    "major": "Biology",
    "minor": "Psychology"
  },

  {
    "facebook_id": "8",
    "name": "Mark Fischbach",
    "school": "VIRGINIA COMMONWEALTH UNIVERSITY",
    "schoolCode": "003735",
    "email": "fischbachme@vcu.edu",
    "classStanding": "Freshman",
    "classes": [
      "Biology:101",
      "Math:101"
    ],
    "methods": [
      "flashcards", "quizzes", "rereading", "mnemonics", "notes", "other"
    ],
    "times": [
      "SundayMorning", "MondayAfternoon", "TuesdayEvening", "WednesdayNight", "ThursdayMorning", "ThursdayAfternoon", "FridayEvening", "SaturdayNight"
    ],
    "locations": [
      "online", "library", "commons", "other", "cafe", "home"
    ],
    "photo": "http://i68.tinypic.com/331lw1u.png",
    "major": "Biology"
  },

  {
    "facebook_id": "7",
    "name": "Machaizelli Kahey",
    "school": "VIRGINIA COMMONWEALTH UNIVERSITY",
    "schoolCode": "003735",
    "email": "machaizellika@vcu.edu",
    "classStanding": "Junior",
    "classes": [
      "Biology:101",
      "Math:101",
      "English:101"
    ],
    "methods": [
      "flashcards", "quizzes", "rereading", "mnemonics", "notes"
    ],
    "times": [
      "SundayMorning", "MondayAfternoon", "TuesdayEvening", "WednesdayNight", "ThursdayMorning", "ThursdayAfternoon", "FridayEvening", "SaturdayNight"
    ],
    "locations": [
      "online", "library", "commons", "other", "home"
    ],
    "photo": "http://i66.tinypic.com/24415sp.jpg",
    "major": "Math",
    "minor": "Women's Studies"
  },

  {
    "facebook_id": "6",
    "name": "Kat Blaque",
    "school": "VIRGINIA COMMONWEALTH UNIVERSITY",
    "schoolCode": "003735",
    "email": "blaqueka@vcu.edu",
    "classStanding": "Freshman",
    "classes": [
      "Biology:101",
      "Math:101",
      "English:101"
    ],
    "methods": [
      "flashcards", "quizzes", "rereading", "mnemonics", "notes"
    ],
    "times": [
      "SundayMorning", "MondayAfternoon", "TuesdayEvening", "WednesdayNight", "ThursdayMorning", "ThursdayAfternoon", "FridayEvening", "SaturdayNight"
    ],
    "locations": [
      "online", "library", "commons", "other", "home"
    ],
    "photo": "http://i65.tinypic.com/1zdb4tg.jpg",
    "major": "Math",
    "minor": "English"
  },

  {
    "facebook_id": "5",
    "name": "Safiya Nygaard",
    "school": "VIRGINIA COMMONWEALTH UNIVERSITY",
    "schoolCode": "003735",
    "email": "nygaardsa@vcu.edu",
    "classStanding": "Senior",
    "classes": [
      "Biology:101",
      "Math:101",
      "English:101"
    ],
    "methods": [
      "flashcards", "quizzes", "rereading", "mnemonics", "notes"
    ],
    "times": [
      "SundayMorning", "MondayAfternoon", "TuesdayEvening", "WednesdayNight", "ThursdayMorning", "ThursdayAfternoon", "FridayEvening", "SaturdayNight"
    ],
    "locations": [
      "online", "library", "commons", "other", "home"
    ],
    "photo": "http://i68.tinypic.com/mm7e3b.jpg",
    "major": "Philosophy",
    "minor": "Biology"
  },

  {
    "facebook_id": "4",
    "name": "Liza Koshy",
    "school": "VIRGINIA COMMONWEALTH UNIVERSITY",
    "schoolCode": "003735",
    "email": "koshyli@vcu.edu",
    "classStanding": "Sophomore",
    "classes": [
      "Biology:101",
      "Math:101",
      "English:101"
    ],
    "methods": [
      "flashcards", "quizzes", "rereading", "mnemonics", "notes"
    ],
    "times": [
      "SundayMorning", "MondayAfternoon", "TuesdayEvening", "WednesdayNight", "ThursdayMorning", "ThursdayAfternoon", "FridayEvening", "SaturdayNight"
    ],
    "locations": [
      "online", "library", "commons", "other", "home"
    ],
    "photo": "http://i66.tinypic.com/2iatkyq.jpg",
    "major": "English"
  },

  {
    "facebook_id": "3",
    "name": "Tyler Williams",
    "school": "VIRGINIA COMMONWEALTH UNIVERSITY",
    "schoolCode": "003735",
    "email": "williamsty@vcu.edu",
    "classStanding": "Sophomore",
    "classes": [
      "Biology:101",
      "Math:101",
      "English:101"
    ],
    "methods": [
      "flashcards", "quizzes", "rereading", "mnemonics", "notes"
    ],
    "times": [
      "SaturdayNight"
    ],
    "locations": [
      "other", "home"
    ],
    "photo": "http://i68.tinypic.com/1zvbms9.jpg",
    "major": "French"
  },

  {
    "facebook_id": "2",
    "name": "Joseph Graceffa",
    "school": "VIRGINIA COMMONWEALTH UNIVERSITY",
    "schoolCode": "003735",
    "email": "graceffajm@vcu.edu",
    "classStanding": "Senior",
    "classes": [
      "Biology:101",
      "Chemistry:101"
    ],
    "methods": [
      "flashcards", "quizzes", "rereading", "mnemonics", "notes"
    ],
    "times": [
      "SundayMorning", "MondayAfternoon", "TuesdayEvening", "WednesdayNight", "ThursdayMorning", "ThursdayAfternoon", "FridayEvening", "SaturdayNight"
    ],
    "locations": [
      "online", "library", "commons", "other", "home"
    ],
    "photo": "http://i68.tinypic.com/9i4kd5.jpg",
    "major": "Chemistry"
  },

  {
    "facebook_id": "1",
    "name": "Bunny Meyer",
    "school": "VIRGINIA COMMONWEALTH UNIVERSITY",
    "schoolCode": "003735",
    "email": "meyerbr@vcu.edu",
    "classStanding": "Freshman",
    "classes": [
      "Biology:101",
      "Math:101",
      "English:101"
    ],
    "methods": [
      "flashcards", "quizzes", "rereading", "mnemonics"
    ],
    "times": [
      "SundayMorning", "TuesdayEvening", "WednesdayNight"
    ],
    "locations": [
      "online"
    ],
    "photo": "http://i66.tinypic.com/x414jl.png",
    "major": "Fashion"
  },
  {
    "facebook_id": "10",
    "name": "Jordan Simmons",
    "school": "VIRGINIA COMMONWEALTH UNIVERSITY",
    "schoolCode": "003735",
    "email": "simmonsjo@vcu.edu",
    "classStanding": "Freshman",
    "classes": [
      "Biology:101",
      "Math:101",
      "English:101"
    ],
    "methods": [
      "flashcards", "quizzes", "rereading", "mnemonics", "notes", "other"
    ],
    "times": [
      "SundayMorning", "MondayAfternoon", "TuesdayEvening", "WednesdayNight", "ThursdayMorning", "ThursdayAfternoon", "FridayEvening", "SaturdayNight"
    ],
    "locations": [
      "online", "library", "commons", "other", "cafe", "home"
    ],
    "photo": "http://i68.tinypic.com/23t1hqt.jpg",
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
