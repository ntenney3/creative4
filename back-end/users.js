const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

const userSchema = new mongoose.Schema({
  username: String,
  firstName: String,
  lastName: String,
  favoriteColor: String,
  favoriteFood: String,
  created: {
    type: Date,
    default: Date.now
  },
});

const User = mongoose.model('User', userSchema);

router.post("/", async (req, res) => {

  if (!req.body.firstName || !req.body.lastName || !req.body.username || !req.body.favoriteFood || !req.body.favoriteColor)
    return res.status(400).send({
      message: "username, first name, last name, favorite food, and favorite color are required"
    });

  const existingUser = await User.findOne({
        username: req.body.username
      });
      if (existingUser)
        return res.status(403).send({
          message: "username already exists"
        });

  const user = new User({
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    favoriteFood: req.body.favoriteFood,
    favoriteColor: req.body.favoriteColor
  });
  try {
    await user.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.get("/", async (req, res) => {
  try {
    let username = req.query.username;
    let user = await User.find({
      username: username
    })
    return res.send(user);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.get("/all", async (req, res) => {
  try {
    let users = await User.find().sort({
      created: -1
    });
    return res.send(users);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = {
  routes: router,
  model: User
};
