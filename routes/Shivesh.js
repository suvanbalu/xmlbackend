const express = require("express");
const User = require("../models/User");
const router = express.Router();
const Userposts = require("../models/Userposts");

router.patch("/update/:postId", async (req, res) => {
    const { postId } = req.params;
    const post = await Userposts.findOneAndUpdate({ post_id: postId },{...post, ...req.body}, {new: false});
    if (!post) {
        return res.status(404).json({ msg: "Post not found" });
    }
    res.json(post);
})

module.exports = router;