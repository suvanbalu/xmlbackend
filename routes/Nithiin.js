const express = require("express");
const UserPosts = require("../models/Userposts");
const router = express.Router();

// Event creation
router.post("/createEvent/:username", async (req, res) => {
  const { username } = req.params;
  const { post_headline, post_description, event_count, deadline } = req.body;
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  const eventStamp = `${year}${month}${day}${hour}${minute}${second}`;
  // const eventStamp = `${year}${month}${day}${hour}${minute}${second}`;

  try {
    const event = await UserPosts.create({
      username,
      post_headline,
      post_description,
      event_count,
      post_id: username + eventStamp,
      deadline,
    });
    res.status(201).json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error - Event cannot be created" });
  }
});

router.delete("/deleteEvent/:post_id", async (req, res) => {
  const { post_id } = req.params;
  try {
    const event = await UserPosts.findOneAndDelete({ post_id: post_id });
    // const event = await UserPosts.findOneAndDelete({ post_id: eventId });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error - Event cannot be deleted" });
  }
});

module.exports = router;
