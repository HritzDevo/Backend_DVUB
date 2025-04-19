require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const connectDB = require('./db');
connectDB();

// Middlewares
const app = express();

app.use(cors());
app.use(express.json()); // To parse JSON bodies

// MongoDB connection

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected 🚀"))
.catch((err) => console.log("MongoDB connection failed ❌:", err));



// Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Port configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
