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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors('*'));

// Test Route
app.get('/', (req, res) => res.send('Server Running Successfully!'));

app.listen(PORT, () => console.log(`Server Running on port ${PORT}!`.cyan));
