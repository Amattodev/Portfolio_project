const express = require('express');
const router = express.Router();
const User = require('../models/user');
const authMiddleware = require('../auth');

//ユーザー作成
router.post('/profile', authMiddleware, async(req, res) => {
    try {
        let user = await User.findOne({uid: req.user.uid});
        if (user) {
            return res.status(400).json({message: 'User already exists'});
        }

        user = new User({
            uid: req.user.uid,
            username: req.body.username || 'Anonymous',
            photoURL: req.user.picture || '',
            email: req.user.email
        })

        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
})
//プロフィール取得
router.get('/profile', authMiddleware, async(req, res) => {
    try {
        const user  = await User.findOne({uid: req.user.uid});
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
        const user = await User.findOne({uid: req.user.uid});
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

        const updatedUser = await User.findOneAndUpdate(
            { uid: req.user.uid }, 
            updates, 
            {new: true}
        );
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

//ユーザー削除
router.delete('/profile', authMiddleware, async(req, res) => {
    try {
        await User.findOneAndDelete({ uid: req.user.uid });
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;