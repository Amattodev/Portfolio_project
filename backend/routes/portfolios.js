const express = require('express');
const router = express.Router();
const Portfolio = require('../models/portfolio');
const authMiddleware = require('../auth');
const User = require('../models/user');

//ポートフォリオの検索
router.get('/', async(req, res) => {
    try {
        const { search } = req.query;
        let query = {};

        if (search && search.trim() !== '') {
            const users = await User.find({
                username: {$regex: search, $options: 'i'}
            })

            const userIds = users.map(user => user._id);

            query = {
                $or: [
                    {title: {$regex: search, $options: 'i'}},
                    {description: {$regex: search, $options: 'i'}},
                    {user: { $in: userIds }},
                ]
            }
        }
        const portfolios = await Portfolio.find(query)
            .populate('user', 'username photoURL')
            .sort({createdAt: -1});
        res.json(portfolios);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

//新規ポートフォリオを作成
router.post('/', authMiddleware, async(req, res) => {
    const dbUser = await User.findOne({uid: req.user.uid}); 
    if (!dbUser) {
        return res.status(404).json({message: 'User not found'});
    }

    const portfolio = new Portfolio({
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl|| '',
        githubUrl: req.body.githubUrl,
        deployUrl: req.body.deployUrl,
        user: dbUser._id
    });

    try {
        const newPortfolio = await portfolio.save();
        await dbUser.updatePortfolioCount();
        res.status(201).json(newPortfolio);
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

//特定のポートフォリオを取得
router.get('/:id', async(req, res) => {
    try {
        const portfolio = await Portfolio.findById(req.params.id)
            .populate('user', 'username photoURL');
        if (!portfolio) {
            return res.status(404).json({message: 'Portfolio not found'});
        }
        res.json(portfolio);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//いいねの追加/削除
router.post('/:id/like', authMiddleware, async(req, res) => {
    try {
        const portfolio = await Portfolio.findById(req.params.id);
        if (!portfolio) {
            return res.status(404).json({message: 'Portfolio not found'});
        }

        const userId = req.user.uid;
        const likeIndex = portfolio.likes.indexOf(userId); 

        if (likeIndex === -1) {
            portfolio.likes.push(userId);
        } else {
            portfolio.likes.splice(likeIndex, 1);
        }

        await portfolio.save();

        const owner = await User.findById(portfolio.user);
        await owner.updateTotalLikes();

        res.json({
            likes: portfolio.likes.length,
            isLiked: portfolio.likes.includes(req.user._id)
        });


    } catch (error) {
        res.status(500).json({message: error.message})
    }

    //ポートフォリオの削除
    router.delete('/:id', authMiddleware, async(req, res) => {
        try {
            const portfolio = await Portfolio.findById(req.params.id);
            if (!portfolio ) {
                return res.status(404).json({message: 'Portfolio not found'});
            }

            const dbUser = await User.findOne({uid: req.user.uid});
            if (portfolio.user.toString() !== dbUser._id.toString()) {
                return res.status(403).json({message: 'Unauthorized'});
            }

            await portfolio.deleteOne(); 
            await dbUser.updatePortfolioCount();
            
            res.json({message: 'Portfolio deleted successfully'});
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    })
})
module.exports = router;