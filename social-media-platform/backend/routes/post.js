const express = require("express");
const Post = require("../models/Post");
const User = require("../models/User");
const router = express.Router();

// Create a post
router.post("/", async (req, res) => {
    try {
        const newPost = new Post({
            userId: req.body.userId,
            content: req.body.content,
            image: req.body.image || ""
        });
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a post
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId.toString() === req.body.userId) {
            await post.deleteOne();
            res.status(200).json({ message: "Post deleted successfully" });
        } else {
            res.status(403).json({ message: "You can only delete your own posts" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Like a post
router.put("/:id/like", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)) {
            post.likes.push(req.body.userId);
        } else {
            post.likes = post.likes.filter(id => id !== req.body.userId);
        }
        await post.save();
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Comment on a post
router.post("/:id/comment", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        post.comments.push({ userId: req.body.userId, text: req.body.text });
        await post.save();
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all posts
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find().populate("userId", "username profilePic");
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
