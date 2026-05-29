const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

const authAdmin = async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });

  if (admin && (await admin.matchPassword(password))) {
    res.json({
      _id: admin._id,
      username: admin.username,
      token: generateToken(admin._id)
    });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
};

const createInitialAdmin = async (req, res) => {
  // Utility endpoint to create a test admin if one doesn't exist.
  const adminCount = await Admin.countDocuments();
  if (adminCount > 0) {
    return res.status(400).json({ message: 'Admin already exists' });
  }
  const admin = await Admin.create({ username: 'admin', password: 'password123' });
  res.status(201).json({ message: 'Initial admin created: admin / password123' });
};

module.exports = { authAdmin, createInitialAdmin };
