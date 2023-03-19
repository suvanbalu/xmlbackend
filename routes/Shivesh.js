const express = require("express");
const User = require("../models/User");
const router = express.Router();
const Userposts = require("../models/Userposts");

router.get("/view/:post_id", async (req, res) => {
  const { post_id } = req.params;

  // return the post
  const post = await Userposts.findOne({ post_id: post_id });
  res.json(post);
});

router.patch("/update/:post_id", async (req, res) => {
  const { post_id } = req.params;

  // Modify the post
  const post = await Userposts.findOneAndUpdate(
    { post_id: post_id },
    req.body,
    { new: false }
  );

  if (!post) {
    return res.status(404).json({ msg: "Post not found" });
  }
  res.status(200).json({ msg: "Post updated" });
});

module.exports = router;

module.exports = router;
