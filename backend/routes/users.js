const express = require('express');
const router = express.Router();
const User = require('../models/user');
const authMiddleware = require('../auth');

//プロフィール取得
router.get('/profile', authMiddleware, async(req, res) => {
    try {
        const user  = await User.findOne({uid: req.user.id});
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

//プロフィール更新
router.put('/profile', authMiddleware, async(req, res) => {
    try {
        const user = await User.findOne({uid: req.user.id});
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        const updates = {
            username: req.body.username,
            bio: req.body.bio,
            photoURL: req.body.photoURL,
            twitter: req.body.twitter,
            github: req.body.github
        };

        const updatedUser = await User.findByOneAndUpdate(
            { uid: req.user.id }, 
            updates, 
            {new: true}
        );
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});