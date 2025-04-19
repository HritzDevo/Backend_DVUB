const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer'); // Import multer
const User = require('../models/User'); // We'll create this model later
const authenticateToken = require('../middleware/authMiddleware');
const { uploadDocument } = require('../controllers/authControllers');

const router = express.Router();

// Set up multer storage and file handling
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Specify the folder where uploaded files will be stored
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Create unique filenames
    }
});

const upload = multer({ storage: storage }); // Create the multer upload object

// Register Route
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
      // Check if user exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ msg: "User already exists!" });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Save new user
      const newUser = new User({
          username,
          email,
          password: hashedPassword
      });

      await newUser.save();

      // Generate JWT Token
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.json({ token });
  } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
  }
});

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        // Generate JWT Token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// Protected route example
router.get('/protected', authenticateToken, (req, res) => {
  res.json({ msg: `Hello, ${req.user.id}! You are authenticated! 🚀` });
});

// Upload Route - Now using multer for file upload
router.post('/upload', authenticateToken, upload.single('documentFile'), uploadDocument);

// Profile Route - Fetch User Info
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // Exclude password from the response

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json({
      username: user.username,
      email: user.email
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Change Password Route
router.post('/change-password', authenticateToken, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ msg: "Please provide both current and new passwords" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Current password is incorrect" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.json({ msg: "Password updated successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
