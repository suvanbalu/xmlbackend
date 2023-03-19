const express = require("express")
const User = require("../models/User")
const router = express.Router();
router.get("/", (req,res) => {
    res.send("authAPI");
    
});



router.get('/', async (req, res) => {
    res.send('Posts API');
});

// Route for user to create a post that assigns a post_id based on the username
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

// Route for retrieving a specific post
router.get('/specific/:postId', async (req, res) => {
    const { postId } = req.params;
    try {
        const post = await Userposts.findOne({post_id: postId});
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Route for user to delete a post
router.delete('/delete/:postId', async (req, res) => {
    const { postId } = req.params;
    try {
        const post = await Userposts.findOneAndDelete({post_id: postId});
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;

// current data