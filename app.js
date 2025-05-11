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
  { name: 'Marius Francois Grassman', role: 'Team Lead', studentNum: '600132'  },// Add student number implimentation and look into adding images
  { name: 'Noah Blaauw', role: 'Developer', studentNum: '601195' },
  { name: 'Viljoen Steenkamp', role: 'Designer', studentNum: '601282' },
  { name: 'Bianca Long', role: 'Developer', studentNum: '600476' }
];

app.locals.events = [
  {
    title: 'Mothers Day Brunch',
    date: '2025-05-11',
    location: 'Community Park',
    image: 'mom.jpg'
  },
  { 
    title: 'Tech Conference', 
    date: '2025-05-14', 
    location: 'Virtual', 
    image: 'tech.jpeg' 
  },
  {
    title: 'Tekkie Town Charaty Golf Day',
    date: '2025-05-17',
    location: 'Kingswood Golf Estate',
    image: 'golf.png'
  },
  {
    title: 'Africa Day Festival',
    date: '2025-05-23',
    location: 'Community Center',
    image: 'festival.jpg'
  },
  { 
    title: 'Forest Marathon', 
    date: '2025-06-03', 
    location: 'Gallery', 
    image: 'forest.jpg' 
  },
  { 
    title: 'Pink Walk – Breast Cancer Awareness', 
    date: '2025-06-21', 
    location: 'Gallery', 
    image: 'breast.jpg' 
  },
  { 
    title: 'Art Exhibition', 
    date: '2025-07-15', 
    location: 'Gallery', 
    image: 'art.jpeg' 
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

