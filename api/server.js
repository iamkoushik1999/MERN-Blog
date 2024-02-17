const express = require('express');
require('dotenv').config();
require('colors');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
// ENV
const { ENV_PORT } = process.env;
const PORT = ENV_PORT;
// Database
const connectDB = require('./config/database');
connectDB();
// Error Middleware
const errorMiddleware = require('./middleware/errorMiddleware');
// Routes Import
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors('*'));

// Test Route
app.get('/', (req, res) => res.send('Server Running Successfully!'));

// Routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/comment', commentRoutes);

// Middleware
app.use(errorMiddleware);

app.listen(PORT, () => console.log(`Server Running on port ${PORT}!`.cyan));
