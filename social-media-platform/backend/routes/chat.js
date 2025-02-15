const express = require("express");
const Message = require("../models/Message");
const router = express.Router();

// Send a message
router.post("/", async (req, res) => {
    try {
        const newMessage = new Message({
            senderId: req.body.senderId,
            receiverId: req.body.receiverId,
            message: req.body.message
        });
        const savedMessage = await newMessage.save();
        res.status(201).json(savedMessage);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get messages between two users
router.get("/:senderId/:receiverId", async (req, res) => {
    try {
        const messages = await Message.find({
            $or: [
                { senderId: req.params.senderId, receiverId: req.params.receiverId },
                { senderId: req.params.receiverId, receiverId: req.params.senderId }
            ]
        }).sort({ timestamp: 1 });
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
