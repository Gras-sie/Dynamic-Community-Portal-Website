// routes/pageRoutes.js
const express = require('express');
const router = express.Router();

// Data storage for contact form submissions
let submissions = [];

// Home Route
router.get('/', (req, res) => {
  res.render('pages/home', {
    title: 'Community Portal - Home',
    upcomingEvents: req.app.locals.events.slice(0, 2)
  });
});

// About Route
router.get('/about', (req, res) => {
  res.render('pages/about', {
    title: 'About Our Team',
    team: req.app.locals.teamMembers
  });
});

// Events Route
router.get('/events', (req, res) => {
  res.render('pages/events', {
    title: 'Upcoming Events',
    events: req.app.locals.events
  });
});

// Contact Form Handling
router.route('/contact')
  .get((req, res) => {
    res.render('pages/contact', {
      title: 'Contact Us',
      formData: req.query.formData || {}
    });
  })
  .post((req, res) => {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
      return res.redirect(`/contact?formData=${encodeURIComponent(JSON.stringify(req.body))}`);
    }

    submissions.push({ name, email, message, date: new Date() });
    res.redirect('/thankyou');
  });

// Thank You Route
router.get('/thankyou', (req, res) => {
  res.render('pages/thankyou', {
    title: 'Thank You!',
    submission: submissions[submissions.length - 1]
  });
});

module.exports = router;