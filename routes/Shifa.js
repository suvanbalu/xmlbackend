const express = require("express")
const User = require("../models/User")
const router = express.Router();


router.get('/', async (req, res) => {
    res.send('Posts API');
});

// Route for retrieving all posts
router.get('/all/:username', async (req, res) => {
    const { username } = req.params;
    try {
        const post = await Userposts.find({username: username});
        if (post.length === 0) {
            return res.status(404).json({ message: 'No posts found' });
        }
        res.json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get("/all", async (req, res) => {
    try {
        const post = await Userposts.find();
        if (post.length === 0) {
            return res.status(404).json({ message: 'No posts found' });
        }
        res.json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
})

module.exports = router;