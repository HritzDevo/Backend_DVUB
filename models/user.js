const mongoose = require('mongoose');

HEAD
// Define the schema
const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,

        unique: true, // Ensure email is unique
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address.'] // Email format validation

    },
    password: {
        type: String,
        required: true
    }
});


// Use the model only if it hasn't been defined already
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;

module.exports = mongoose.model('User', UserSchema);
 
