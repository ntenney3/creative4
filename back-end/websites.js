const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

const users = require("./users.js");
const User = users.model;

const websiteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  path: String,
  username: String,
  password: String,
  created: {
    type: Date,
    default: Date.now
  },
});

const Website = mongoose.model('Website', websiteSchema);

router.post("/", async (req, res) => {
  // check parameters
  if (!req.body.username || !req.body.password || !req.body.path)
    return res.status(400).send({
      message: "url, username, and password are required"
    });
  let user = await User.find({
      username: req.body.user
    });
  if (user.length === 0) {
    console.log("user not found");
    return res.sendStatus(404);
  }
  const website = new Website({
    user: user[0],
    path: req.body.path,
    username: req.body.username,
    password: req.body.password
  });
  try {
    await website.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.get("/", async (req, res) => {
  let user = await User.find({
      username: req.query.username
    });
  try {
    let websites = await Website.find({
      user: user[0]
    }).sort({
      created: -1
    }).populate('user');
    return res.send(websites);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.get("/all", async (req, res) => {
  try {
    let websites = await Website.find().sort({
      created: -1
    }).populate('user');
    return res.send(websites);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Website.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.put('/:id', async (req, res) => {
  if (!req.body.username || !req.body.password)
    return res.status(400).send({
      message: "username and password must have content"
    });
  try {
    let website = await Website.findOne({
      _id: req.params.id
    });
    website.username = req.body.username;
    website.password = req.body.password
    website.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = {
  model: Website,
  routes: router,
}
