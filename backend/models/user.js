const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    //Firebase認証とMongoDBの紐付け
    uid: {
        type: String,
        required: true,
        unique: true
    },
    //ユーザー表示名
    username: {
        type: String,
        required: true
    },
    bio: String,
    photoURL: String,
    twitter: String,
    github: String,
    portfolioCount: {
        type: Number,
        default: 0
    },
    totalLikes: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

userSchema.methods.updatePortfolioCount =  async function() {
    const count = await mongoose.model('Portfolio').countDocuments({user: this._id});
    this.portfolioCount = count;
    return this.save();
};

userSchema.methods.updateTotalLikes = async function() {
    const portfolios = await mongoose.model('Portfolio').find({ user: this._id });
    this.totalLikes = portfolios.reduce((total, portfolio) => total + portfolio.likes.length, 0);
    return this.save();
};

module.exports = mongoose.model('User', userSchema);