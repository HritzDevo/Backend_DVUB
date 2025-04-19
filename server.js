require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
<<<<<<< HEAD

const connectDB = require('./db');
connectDB();

// Middlewares
const app = express();
=======
const dotenv = require('dotenv');

const connectDB = require('./db');
connectDB();
// Initialize dotenv to load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middlewares
>>>>>>> 0b569782990f24821a1cde35b0e31beaf5a3f312
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// MongoDB connection
<<<<<<< HEAD
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected 🚀"))
.catch((err) => console.log("MongoDB connection failed ❌:", err));

=======
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));
>>>>>>> 0b569782990f24821a1cde35b0e31beaf5a3f312

// Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Port configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
