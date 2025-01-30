const express = require('express');
const router = express.Router();
const Portfolio = require('../models/portfolio');
const authMiddleware = require('../auth');

//ポートフォリオ一覧を取得
router.get('/', async(req, res) => {
    try {
        const portfolios = await Portfolio.find()
            .populate('user', 'username photoURL')
            .sort({createdAt: -1});
        res.json(portfolios);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//新規ポートフォリオを作成
router.post('/', authMiddleware, async(req, res) => {
    const portfolio = new Portfolio({
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        githubUrl: req.body.githubUrl,
        deployUrl: req.body.deployUrl,
        user: req.user.id
    });

    try {
        const newPortfolio = await portfolio.save();
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

module.exports = router;