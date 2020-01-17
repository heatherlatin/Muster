const mongoose = require("mongoose");
const EventSchema = require("./schema/event");
const MobSchema = require("./schema/mob");
// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
var bcrypt = require("bcryptjs");
// var assert = require('assert');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  // The password cannot be null
  password: {
    type: String,
    required: true
  },
  displayName: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  location: {
    type: Object,
    required: true,
  },
  about: {
    type: Array,
    required: true
  },
  events: [
    {
      type: EventSchema,
    }
  ],
  mobs: [
    {
      type: MobSchema,
    }
  ]
});

// Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
UserSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
// Hooks are automatic methods that run during various phases of the User Model lifecycle
// In this case, before a User is created, we will automatically hash their password
UserSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10), null);
  next();
});

const User = mongoose.model("User", UserSchema);

// Now, the interesting part:
// data = [
//   {
//     "email": "dee@dee.com",
//     "password": "ThisPassword*9",
//     "displayName": "DeeDee",
//     "firstName": "Dee",
//     "lastName": "Sa",
//     "location": {
//       "city": "Irvine",
//       "state": "California",
//       "zip": "92697"
//     },
//     "events": [
//       {
//         "id": 00,
//         "title": "Graduation!",
//         "start": "2019-12-04",
//         "end": "1:00 PM",
//         "isSelected": true
//       },
//       {
//         "id": 01,
//         "title": "After Party",
//         "start": "2019-12-04",
//         "end": "3:00 PM",
//         "isSelected": true
//       },
//       {
//         "id": 02,
//         "title": "Ski Trip",
//         "start": "2019-12-05",
//         "end": "10:00 AM",
//         "isSelected": true
//       },
//       {
//         "id": 04,
//         "title": "Movie Night",
//         "start": "2019-12-07",
//         "end": "9:00 PM",
//         "isSelected": true
//       }
//     ],
//     "mobs": [],
//     "abouts": []
//   },
//   {
//     "email": "meera@merr.com",
//     "password": "ThisPassword*9",
//     "displayName": "MeeraIsFire",
//     "firstName": "Meera",
//     "lastName": "Du",
//     "location": {
//       "city": "Irvine",
//       "state": "California",
//       "zip": "92697"
//     },
//     "events": [
//       {
//         "id": 00,
//         "title": "Graduation!",
//         "start": "2019-12-04",
//         "end": "1:00 PM",
//         "isSelected": true
//       },
//       {
//         "id": 01,
//         "title": "After Party",
//         "start": "2019-12-04",
//         "end": "3:00 PM",
//         "isSelected": true
//       },
//       {
//         "id": 02,
//         "title": "Ski Trip",
//         "start": "2019-12-05",
//         "end": "10:00 AM",
//         "isSelected": true
//       },
//       {
//         "id": 05,
//         "title": "Party!",
//         "start": "2019-12-07",
//         "end": "9:00 PM",
//         "isSelected": true
//       }
//     ],
//     "mobs": [],
//     "abouts": []
//   },
//   {
//     "email": "dillon@dillon.com",
//     "password": "ThisPassword*9",
//     "displayName": "DieLon",
//     "firstName": "Dillon",
//     "lastName": "Co",
//     "location": {
//       "city": "Irvine",
//       "state": "California",
//       "zip": "92697"
//     },
//     "events": [
//       {
//         "id": 00,
//         "title": "Graduation!",
//         "start": "2019-12-04",
//         "end": "1:00 PM",
//         "isSelected": true
//       },
//       {
//         "id": 01,
//         "title": "After Party",
//         "start": "2019-12-04",
//         "end": "3:00 PM",
//         "isSelected": true
//       },
//       {
//         "id": 02,
//         "title": "Ski Trip",
//         "start": "2019-12-05",
//         "end": "10:00 AM",
//         "isSelected": true
//       },
//       {
//         "id": 06,
//         "title": "(Video) Game Night",
//         "start": "2019-12-07",
//         "end": "all day",
//         "isSelected": true
//       }
//     ],
//     "mobs": [],
//     "abouts": []
//   },
//   {
//     "email": "lawrence@lawrence.com",
//     "password": "ThisPassword*9",
//     "displayName": "Lauren",
//     "firstName": "Lawrence",
//     "lastName": "Ru",
//     "location": {
//       "city": "Irvine",
//       "state": "California",
//       "zip": "92697"
//     },
//     "events": [
//       {
//         "id": 00,
//         "title": "Graduation!",
//         "start": "2019-12-04",
//         "end": "1:00 PM",
//         "isSelected": true
//       },
//       {
//         "id": 01,
//         "title": "After Party",
//         "start": "2019-12-04",
//         "end": "3:00 PM",
//         "isSelected": true
//       },
//       {
//         "id": 02,
//         "title": "Ski Trip",
//         "start": "2019-12-05",
//         "end": "10:00 AM",
//         "isSelected": true
//       },
//       {
//         "id": 06,
//         "title": "(Video) Game Night",
//         "start": "2019-12-07",
//         "end": "",
//         "isSelected": true
//       }
//     ],
//     "mobs": [],
//     "abouts": []
//   },
//   {
//     "email": "taylor@taylor.com",
//     "password": "ThisPassword*9",
//     "displayName": "Teach",
//     "firstName": "Jon",
//     "lastName": "Taylor",
//     "location": {
//       "city": "Irvine",
//       "state": "California",
//       "zip": "92697"
//     },
//     "events": [
//       {
//         "id": 00,
//         "title": "Graduation!",
//         "start": "2019-12-04",
//         "end": "1:00 PM",
//         "isSelected": true
//       },
//       {
//         "id": 01,
//         "title": "After Party",
//         "start": "2019-12-04",
//         "end": "3:00 PM",
//         "isSelected": true
//       }
//     ],
//     "mobs": [],
//     "abouts": []
//   },
//   {
//     "email": "calum@calum.com",
//     "password": "ThisPassword*9",
//     "displayName": "calum-ragan",
//     "firstName": "Calum",
//     "lastName": "Ra",
//     "location": {
//       "city": "Irvine",
//       "state": "California",
//       "zip": "92697"
//     },
//     "events": [
//       {
//         "id": 00,
//         "title": "Graduation!",
//         "start": "2019-12-04",
//         "end": "1:00 PM",
//         "isSelected": true
//       },
//       {
//         "id": 01,
//         "title": "After Party",
//         "start": "2019-12-04",
//         "end": "3:00 PM",
//         "isSelected": true
//       },
//       {
//         "id": 02,
//         "title": "Ski Trip",
//         "start": "2019-12-05",
//         "end": "10:00 AM",
//         "isSelected": true
//       },
//       {
//         "id": 11,
//         "title": "Roller Skating",
//         "start": "2019-12-07",
//         "end": "1:00 PM",
//         "isSelected": true
//       }
//     ],
//     "mobs": [],
//     "abouts": []
//   },
//   {
//     "email": "zach@zach.com",
//     "password": "ThisPassword*9",
//     "displayName": "zachary",
//     "firstName": "Zach",
//     "lastName": "Bu",
//     "location": {
//       "city": "Irvine",
//       "state": "California",
//       "zip": "92697"
//     },
//     "events": [
//       {
//         "id": 00,
//         "title": "Graduation!",
//         "start": "2019-12-04",
//         "end": "1:00 PM",
//         "isSelected": true
//       },
//       {
//         "id": 01,
//         "title": "After Party",
//         "start": "2019-12-04",
//         "end": "3:00 PM",
//         "isSelected": true
//       },
//       {
//         "id": 02,
//         "title": "Ski Trip",
//         "start": "2019-12-05",
//         "end": "10:00 AM",
//         "isSelected": true
//       },
//       {
//         "id": 12,
//         "title": "Roller Skating",
//         "start": "2019-12-07",
//         "end": "1:00 PM",
//         "isSelected": true
//       }
//     ],
//     "mobs": [],
//     "abouts": []
//   },
//   {
//     "email": "chris@chris.com",
//     "password": "ThisPassword*9",
//     "displayName": "chris",
//     "firstName": "Chris",
//     "lastName": "La",
//     "location": {
//       "city": "Irvine",
//       "state": "California",
//       "zip": "92697"
//     },
//     "events": [
//       {
//         "id": 00,
//         "title": "Graduation!",
//         "start": "2019-12-04",
//         "end": "1:00 PM",
//         "isSelected": true
//       },
//       {
//         "id": 01,
//         "title": "After Party",
//         "start": "2019-12-04",
//         "end": "3:00 PM",
//         "isSelected": true
//       },
//       {
//         "id": 02,
//         "title": "Ski Trip",
//         "start": "2019-12-05",
//         "end": "10:00 AM",
//         "isSelected": true
//       },
//       {
//         "id": 13,
//         "title": "Roller Skating",
//         "start": "2019-12-07",
//         "end": "1:00 PM",
//         "isSelected": true
//       }
//     ],
//     "mobs": [],
//     "abouts": []
//   },
//   {
//     "email": "macie@macie.com",
//     "password": "ThisPassword*9",
//     "displayName": "MacieBaby",
//     "firstName": "Macie",
//     "lastName": "La",
//     "location": {
//       "city": "Irvine",
//       "state": "California",
//       "zip": "92697"
//     },
//     "events": [
//       {
//         "id": 00,
//         "title": "Graduation!",
//         "start": "2019-12-04",
//         "end": "1:00 PM",
//         "isSelected": true
//       },
//       {
//         "id": 01,
//         "title": "After Party",
//         "start": "2019-12-04",
//         "end": "3:00 PM",
//         "isSelected": true
//       },
//       {
//         "id": 02,
//         "title": "Ski Trip",
//         "start": "2019-12-05",
//         "end": "10:00 AM",
//         "isSelected": true
//       },
//       {
//         "id": 14,
//         "title": "Roller Skating",
//         "start": "2019-12-07",
//         "end": "1:00 PM",
//         "isSelected": true
//       }
//     ],
//     "mobs": [],
//     "abouts": []
//   }
// ]

// User.collection.insertMany(data, function (err, r) {
//   assert.equal(null, err);
//   assert.equal(9, r.insertedCount);
// })

module.exports = User;