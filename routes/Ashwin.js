const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  res.send("authAPI");
});

// user signup
router.post("/usignup", async (req, res) => {
  try {
    console.log(req.body);
    const auth = await User.findOne({ username: req.body.username });
    if (auth) {
      return res.status(500).json({ message: "User already exists" });
    }
    const user = await User.create({
      ...req.body,
      password: bcrypt.hashSync(req.body.password, 10),
    });
    res.status(201).json({ user: user._id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});
//  user login
router.post("/ulogin", async (req, res) => {
  try {
    const { username, password } = req.body;
    const auth = await User.findOne({ username: username });
    if (auth) {
      if (bcrypt.compareSync(password, auth.password)) {
        const token = jwt.sign({ id: auth._id }, "secret-key");
        res
          .status(200)
          .json({ auth: auth._id, token: token, username: username });
      } else {
        res.status(500).json({ message: "Invalid Password" });
      }
    } else {
      res.status(500).json({ message: "Invalid Email" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// user secret route
router.get("/ulogin", async (req, res) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "secret-key", (err, decoded) => {
      if (err) {
        res.status(401).json({ error: "Invalid Token" });
      } else {
        res.status(200).json({ message: "Authorized" });
      }
    });
  } else {
    res.status(401).json({ error: "Token not provided" });
  }
});


module.exports = router;
