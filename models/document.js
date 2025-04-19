const mongoose = require('mongoose');

// Define the Document schema
const documentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
  documentType: { type: String, required: true },
  documentId: { type: String, required: true },
  issueDate: { type: Date, required: true },
  documentFile: { type: String, required: true }, // Store the file path or file URL
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Document', documentSchema);
