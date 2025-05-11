// app.js - Main server setup
const express = require('express');
const path = require('path');
const pageRoutes = require('./routes/pageRoutes');

// Basic security and performance tools
const helmet = require('helmet');
const compression = require('compression');

const app = express();
const port = process.env.PORT || 3000;

// Set up app basics
app.use(helmet()); // Security headers
app.use(compression()); // Faster page loads
app.use(express.urlencoded({ extended: true })); // Form data handling

// Where to find website files
app.use(express.static(path.join(__dirname, 'public')));

// Set up templates
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Sample data for pages
app.locals.teamMembers = [
  { name: 'John', role: 'Developer' },
  { name: 'Sarah', role: 'Designer' }
];

app.locals.events = [
  { 
    title: 'Tech Conference', 
    date: '2025-06-01', 
    location: 'Virtual', 
    image: 'Tech.jpg' 
  },
  { 
    title: 'Art Exhibition', 
    date: '2025-07-15', 
    location: 'Gallery', 
    image: 'Art.jpg' 
  }
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
    title: 'Something Went Wrong',
    message: 'We\'re working on fixing this'
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running:`);
  console.log(`- Local: http://localhost:${port}`);
  console.log(`- Network: http://${getLocalIP()}:${port}`);
});

// Get the computer's network address
function getLocalIP() {
  const interfaces = require('os').networkInterfaces();
  for (const name in interfaces) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

