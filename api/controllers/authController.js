// Packages
const bcryptjs = require('bcryptjs');

// Models
const userModel = require('../models/userModel');

// ----------------------------------------------------------- Auth -----------------------------------------------------------

// POST
// Sign Up
exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === '' ||
    email === '' ||
    password === ''
  ) {
    return res.status(400).json({ message: 'All Fields are required' });
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  try {
    const newUser = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(200).json({ message: 'Sign up successfully', newUser });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
