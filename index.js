// Import the express module
const express = require('express');

// Create an instance of express
const app = express();

// Serve static files from the "public" directory
app.use(express.static('public'));

// Start the server on port 3000
app.listen(80, () => {
    console.log('Server is running on http://localhost');
});