const express = require("express");
const User = require("../models/User");
const Cuser = require("../models/Cuser");
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
// cuser signup
router.post("/csignup", async (req, res) => {
  console.log("1", req.body);
  const {
    comp_name,
    b_type,
    c_email,
    c_password,
    c_phone,
    c_address,
    c_username,
  } = req.body;
  try {
    const salt = bcrypt.genSaltSync(10);
    const user = await Cuser.create({
      comp_name: comp_name,
      b_type: b_type,
      c_email: c_email,
      c_password: bcrypt.hashSync(c_password, salt),
      c_phone: c_phone,
      c_address: c_address,
      c_username: c_username,
    });
    res.send(201).json({ user: user._id });
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

// cuser login
router.post("/clogin", async (req, res) => {
  try {
    const { c_username, password } = req.body;
    const auth = await Cuser.findOne({ c_username: c_username });
    if (auth) {
      if (bcrypt.compareSync(password, auth.c_password)) {
        const token = jwt.sign({ id: auth._id }, "secret-key");
        res.status(200).json({ auth: auth._id, token: token });
      } else {
        res.status(500).json({ message: "Invalid Password" });
      }
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

router.get("/clogin", async (req, res) => {
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
// user profile
router.get("/uprofile/:id", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.id });
    if (!user) {
      console.log("User not found");
      res.status(404).json({ error: "Not Found" });
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/cprofile/:id", async (req, res) => {
  try {
    const user = await Cuser.findOne({ c_username: req.params.id });
    if (!user) {
      return res.status(404).json({ error: "Not Found" });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
