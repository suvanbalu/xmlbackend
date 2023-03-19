const express = require("express");
const User = require("../models/User");
const router = express.Router();
const Userposts = require("../models/Userposts");
router.get("/", (req, res) => {
  res.send("authAPI");
});

router.post("/cbid/:postId/", async (req, res) => {
  try {
    const { caterer, amount, pitch } = req.body;
    const { postId } = req.params.postId;
    const post = await Userposts.findOne({ post_id: req.params.postId });
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    const bid = post.bids.find((bid) => bid.caterer === caterer);
    if (bid) {
      console.log("bid found");
      let update = {};
      if (amount) update["bids.$.amount"] = amount;
      if (pitch) update["bids.$.pitch"] = pitch;
      console.log(update);
      const updatedpost = await Userposts.findOneAndUpdate(
        { post_id: req.params.postId, "bids.caterer": caterer },
        { $set: update },
        { new: true }
      );
      res.send(updatedpost);
    } else {
      const updatedpost = await Userposts.findOneAndUpdate(
        { post_id: req.params.postId },
        {
          $push: {
            bids: {
              caterer,
              amount,
              pitch,
            },
          },
        },
        { new: true }
      );
      res.json(updatedpost);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
