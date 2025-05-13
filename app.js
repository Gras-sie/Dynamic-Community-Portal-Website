// Main website file - handles all the basic setup
const express = require('express');
const path = require('path');
const helmet = require('helmet');
const compression = require('compression');
const connectDB = require('./config/database');
const pageRoutes = require('./routes/pageRoutes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Connect to Database
connectDB();

// Middleware
app.use(helmet()); // Makes the site more secure
app.use(compression()); // Makes pages load faster
app.use(express.urlencoded({ extended: true })); // Helps with forms
app.use(express.static(path.join(__dirname, 'public'))); // Where we keep our images and CSS

// Where to find our web pages
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Team data
app.locals.teamMembers = [
  { name: 'Marius Francois Grassman', role: 'Team Lead', studentNum: '600132'  },// Add student number implimentation and look into adding images
  { name: 'Noah Blaauw', role: 'Developer', studentNum: '601195' },
  { name: 'Viljoen Steenkamp', role: 'Designer', studentNum: '601282' },
  { name: 'Bianca Long', role: 'Developer', studentNum: '600476' }
];

// Connect page routes
app.use('/', pageRoutes);

// Handle missing pages
app.use((req, res) => {
  res.status(404).render('pages/404', {
    title: 'Page Not Found',
    message: "This page doesn't exist"
  });
});

// Handle server errors
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).render('pages/error', {
    title: 'Error',
    message: 'We\'re working on fixing this'
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at:`);
  console.log(`- Local:   http://localhost:${port}`);
  console.log(`- Network: http://${require('os').networkInterfaces()['Ethernet']?.[0]?.address || 'localhost'}:${port}`);
});

