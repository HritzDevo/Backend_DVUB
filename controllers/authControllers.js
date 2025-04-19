const multer = require('multer');
const path = require('path');
const User = require('../models/user'); // Assuming your user model is here
const Document = require('../models/document'); // New Document model (explained below)

// Multer setup to save files on the local filesystem (you can change this to S3 or Firebase if needed)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  }
});

const upload = multer({ storage: storage });

// Document upload handler
exports.uploadDocument = async (req, res) => {
  try {
    const { documentType, documentId, issueDate } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No document file uploaded' });
    }

    // Create a new Document record
    const newDocument = new Document({
      userId: req.user.id, // Assuming JWT middleware attaches the user ID to the request
      documentType,
      documentId,
      issueDate,
      documentFile: file.path // File path of the uploaded document
    });

    // Save document to database
    await newDocument.save();

    res.status(201).json({
      message: 'Document uploaded successfully!',
      document: newDocument
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to upload document', error });
  }
};
