// This file handles what happens when users visit different pages
const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// Memory store for form submissions
const submissions = [];

// Shows the home page with next 2 upcoming events
const getHome = async (req, res, next) => {
    try {
        const [upcomingEvents, pastEvents] = await Promise.all([
            Event.find({ isPast: false }).sort('date').limit(2), // Just get next 2 events
            Event.find({ isPast: true }).sort('-date')
        ]);
        res.render('pages/home', { title: 'Home', upcomingEvents, pastEvents });
    } catch (error) {
        next(error);
    }
};

// Shows all upcoming events
const getEvents = async (req, res, next) => {
    try {
        const events = await Event.find({ isPast: false }).sort('date');
        res.render('pages/events', { title: 'Upcoming Events', events });
    } catch (error) {
        next(error);
    }
};

// Handles when someone sends us a message
const handleContact = (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.redirect(`/contact?formData=${encodeURIComponent(JSON.stringify(req.body))}`);
    }
    submissions.push({ name, email, message, date: new Date() });
    res.redirect('/thankyou');
};

// Routes
router.get('/', getHome);
router.get('/events', getEvents);
router.get('/about', (req, res) => {
    res.render('pages/about', {
        title: 'About Our Team',
        team: req.app.locals.teamMembers
    });
});

router.get('/contact', (req, res) => {
    res.render('pages/contact', {
        title: 'Contact Us',
        formData: req.query.formData || {}
    });
});

router.post('/contact', handleContact);

router.get('/thankyou', (req, res) => {
    res.render('pages/thankyou', {
        title: 'Thank You!',
        submission: submissions[submissions.length - 1]
    });
});

module.exports = router;