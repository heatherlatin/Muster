// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const router = require("express").Router();

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticatedData = require("../config/middleware/isAuthenticatedData");

// Using the passport.authenticate middleware with our local strategy.
// If the user has valid login credentials, send them to the members page.
// Otherwise the user will be sent an error
router.post("/api/login", passport.authenticate("local"), function (req, res) {
  res.json({
    email: req.user.email,
    id: req.user.id
  });
});

// Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
// how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
// otherwise send back an error
router.post("/api/signup", function (req, res) {
  db.User.create({
    email: req.body.email,
    password: req.body.password,
    displayName: req.body.displayName,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    location: req.body.location,
    about: req.body.about
  })
    .then(function () {
      res.redirect(307, "/api/login");
    })
    .catch(function (err) {
      res.status(401).json(err);
    });
});

// Route for logging user out
router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

// Route for logging user out
router.post("/api/logout", function (req, res) {
  req.logout();
  res.json({});
});

// Route for getting some data about our user to be used client side
router.get("/api/user_data", function (req, res) {
  if (!req.user) {
    // The user is not logged in, send back an empty object
    res.json({});
  } else {
    // Otherwise send back the user's email and id
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      id: req.user.id,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      displayName: req.user.displayName,
      location: req.user.location,
      events: req.user.events,
      mobs: req.user.mobs,
      about: req.user.about
    });
  }
});

router.get("/api/events", isAuthenticatedData, function (req, res) {
  db.User.findById(req.user._id)
    .then(function (dbUser) {
      res.json(dbUser.events);
    })
    .catch(function (err) {
      res.status(500).json(err);
    });
});
router.post("/api/events", isAuthenticatedData, function (req, res) {
  const event = new db.Event({
    resource: { id: req.body.resource.id, eventSelected: true},
    title: req.body.title,
    start: req.body.start,
    end: req.body.end,
    time: req.body.time,
    isSelected: true
  });
  console.log(JSON.stringify(event));
  db.User.update(
    { _id: req.user._id },
    { $push: { events: event } })
    .then(function () {
      res.json(event);
    })
    .catch(function (err) {
      res.status(500).json(err);
    });
});

router.get("/api/mobs", isAuthenticatedData, function (req, res) {
  db.User.find({})
    .then(function (dbMobs) {
      res.json(dbMobs);
    })
    .catch(function (err) {
      res.status(500).json(err);
    });
});
router.post("/api/mobs", isAuthenticatedData, function (req, res) {
  const mob = new db.Mob({
    name: req.body.name,
    id: req.body.mobUserId
  });
  console.log(JSON.stringify(mob));
  db.User.update(
    { _id: req.user._id },
    { $push: { mobs: mob } })
    .then(function () {
      res.json(mob);
    })
    .catch(function (err) {
      res.status(500).json(err);
    });
});

router.get("/api/abouts", isAuthenticatedData, function (req, res) {
  db.User.findById(req.user._id)
    .then(function (dbUser) {
      res.json(dbUser.abouts);
    })
    .catch(function (err) {
      res.status(500).json(err);
    });
});
router.post("/api/abouts", isAuthenticatedData, function (req, res) {
  const about = new db.About({
    questions: req.body.questions,
    aboutUser: req.body.aboutUser,
  });
  console.log(JSON.stringify(about));
  db.User.update(
    { _id: req.user._id },
    { $push: { abouts: about } })
    .then(function () {
      res.json(about);
    })
    .catch(function (err) {
      res.status(500).json(err);
    });
});


module.exports = router;

