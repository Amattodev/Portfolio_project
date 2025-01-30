const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const usersRouter = require('./routes/users');
const portfoliosRouter = require('./routes/portfolios');

//expressの設定
const app = express();
app.use(cors());
app.use(express.json());

//ルートの設定
app.use('/api/portfolios', portfoliosRouter);
app.use('/api/users', usersRouter);

// MongoDB接続
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('MongoDB connection error:', err));

// テスト用のルート
app.get('/', (req, res) => {
  res.send('API is running');
});

// サーバー起動
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});