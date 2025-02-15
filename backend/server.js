const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const usersRouter = require('./routes/users');
const portfoliosRouter = require('./routes/portfolios');

//expressの設定
const app = express();
app.use(cors({
  origin: 'https://portfoliofrontend-pied.vercel.app',  
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());

//ルートの設定
app.use('/api/portfolios', portfoliosRouter);
app.use('/api/users', usersRouter);

// MongoDB接続
mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 5000
})
.then(() => {
    console.log('MongoDB connected successfully');
})
.catch((err) => {
    console.error('MongoDB connection error:', err);
    console.error('Error details:', {
        name: err.name,
        message: err.message,
        code: err.code
    });
});

mongoose.connection.on('error', err => {
    console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

// テスト用のルート
app.get('/', (req, res) => {
  res.send('API is running');
});

// サーバー起動
const PORT = process.env.PORT || 8002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://portfoliofrontend-pied.vercel.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});