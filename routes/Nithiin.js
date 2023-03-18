const express = require("express");
const User = require("../models/User");
const router = express.Router();
const Userposts = require("../models/Userposts");

router.post('/create/:username', async (req, res) => {
    const { username } = req.params;
    const { post_description, event_count, deadline,post_headline} = req.body;
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    const stamp = `${year}${month}${day}${hour}${minute}${second}`; 
    // console.log(year,month,day,hour,minute,second)
    // console.log(stamp);
    try {
        const post = await Userposts.create({
        username,
        post_description,
        post_headline,
        post_id: username + stamp,
        event_count,
        deadline
        });
    
        res.status(201).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}); 

module.exports = router;