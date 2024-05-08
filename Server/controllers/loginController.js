const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models');

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await User.findOne({ where: { Username: username } });

    // If user not found or password does not match, return error
    if (!user || !bcrypt.compareSync(password, user.Password)) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.UserID, role: user.Role }, 'your-secret-key', { expiresIn: '1h' });

    // Update last login date
    await User.update({ LastLoginDate: new Date() }, { where: { UserID: user.UserID } });

    // Return token and user info
    res.json({ token, user });
  } catch (error) {
    console.error('Login failed:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// const jwt = require('jsonwebtoken');
// const { User } = require('../models');

// exports.login = async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     // Find user by username
//     const user = await User.findOne({ where: { Username: username } });

//     // If user not found or password does not match, return error
//     if (!user || user.Password !== password) {
//       return res.status(401).json({ message: 'Invalid username or password' });
//     }

//     // Generate JWT token
//     const token = jwt.sign({ userId: user.UserID, role: user.Role }, 'your-secret-key', { expiresIn: '1h' });

//     // Update last login date
//     await User.update({ LastLoginDate: new Date() }, { where: { UserID: user.UserID } });

//     // Return token and user info
//     res.json({ token, user });
//   } catch (error) {
//     console.error('Login failed:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };
