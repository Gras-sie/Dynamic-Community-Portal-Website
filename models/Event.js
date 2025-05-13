// This is how we store events in our database
const mongoose = require('mongoose');

// What info we keep for each event
const eventSchema = new mongoose.Schema({
    title: String,      // Name of the event
    date: Date,         // When it happens
    location: String,   // Where it happens
    image: String,      // Picture for the event
    description: String,// What the event is about
    attendees: Number,  // How many people came (for past events)
    highlights: String, // Cool stuff that happened
    isPast: Boolean    // Already happened or not
});

module.exports = mongoose.model('Event', eventSchema);
