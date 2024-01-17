const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3001;

// Multer setup for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../'); // Specify the destination directory for saving files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name
  },
});

const upload = multer({ storage: storage });

// Serve uploaded files statically
app.use('../', express.static('uploads'));

// Set up a route for handling file uploads
app.post('/upload', upload.single('image'), (req, res) => {
  // You can access the uploaded file details using req.file
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  // Example: Log the file details
  console.log('File uploaded:', req.file);

  res.status(200).send('File uploaded successfully');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
