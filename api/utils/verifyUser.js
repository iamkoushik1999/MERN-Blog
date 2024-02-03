// Packages
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
// ENV
const { SECRET_KEY } = process.env;
// ---------------------------------------------------------------------------------------------------------

exports.verifyUser = asyncHandler(async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    res.status(401);
    throw new Error('Unauthorized');
  }
  // Token Verify
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      res.status(401);
      throw new Error('Unauthorized');
    }
    req.user = user;
    next();
  });
});
