// routes/pageRoutes.js

const express = require('express');
const router = express.Router();

// Data storage for contact form submissions (in-memory array)
let submissions = [];

// Sample data arrays 
const teamMembers = [
  { name: 'John', role: 'Developer' },
  { name: 'Sarah', role: 'Designer' }
];

// Home Route
router.get('/', (req, res) => {
  res.render('pages/home', {
    title: 'Community Portal - Home',
    upcomingEvents: events.slice(0, 2) // Show 2 upcoming events on home
  });
});

// About Route with team data
router.get('/about', (req, res) => {
  res.render('pages/about', {
    title: 'About Our Team',
    team: teamMembers
  });
});

// Events Route with all events
router.get('/events', (req, res) => {
  res.render('pages/events', {
    title: 'Upcoming Events',
    events: events
  });
});

// Contact Form Handling
router.route('/contact')
  .get((req, res) => {
    res.render('pages/contact', {
      title: 'Contact Us',
      formData: req.query.formData || {} // For error handling/repopulation
    });
  })
  .post((req, res) => {
    const { name, email, message } = req.body;
    
    // Basic validation
    if (!name || !email || !message) {
      return res.redirect('/contact?formData=' + encodeURIComponent(JSON.stringify(req.body)));
    }

    submissions.push({ name, email, message, date: new Date() });
    res.redirect('/thankyou');
  });

// Thank You Route
router.get('/thankyou', (req, res) => {
  res.render('pages/thankyou', {
    title: 'Thank You!',
    submission: submissions[submissions.length - 1] // Show latest submission
  });
});

module.exports = router;
