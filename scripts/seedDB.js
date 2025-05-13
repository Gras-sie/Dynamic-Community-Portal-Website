const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/community_portal')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const Event = require('../models/Event');
const allEvents = [
  // Upcoming Events
  {
    title: 'Mothers Day Brunch',
    date: new Date('2025-05-11'),
    location: 'Community Park',
    image: 'mom.jpg',
    description: 'Special brunch celebration for mothers',
    isPast: false
  },
  { 
    title: 'Tech Conference', 
    date: new Date('2025-05-14'), 
    location: 'Virtual', 
    image: 'tech.jpeg',
    description: 'Virtual tech conference featuring industry experts',
    isPast: false
  },
  {
    title: 'Tekkie Town Charity Golf Day',
    date: new Date('2025-05-17'),
    location: 'Kingswood Golf Estate',
    image: 'golf.png',
    description: 'Annual charity golf tournament',
    isPast: false
  },
  {
    title: 'Africa Day Festival',
    date: new Date('2025-05-23'),
    location: 'Community Center',
    image: 'festival.jpg',
    description: 'Celebration of African culture and heritage',
    isPast: false
  },
  { 
    title: 'Forest Marathon', 
    date: new Date('2025-06-03'), 
    location: 'Gallery', 
    image: 'forest.jpg',
    description: 'Annual marathon through scenic forest routes',
    isPast: false
  },
  { 
    title: 'Pink Walk – Breast Cancer Awareness', 
    date: new Date('2025-06-21'), 
    location: 'Gallery', 
    image: 'breast.jpg',
    description: 'Awareness walk supporting breast cancer research',
    isPast: false
  },
  { 
    title: 'Art Exhibition', 
    date: new Date('2025-07-15'), 
    location: 'Gallery', 
    image: 'art.jpeg',
    description: 'Showcase of local artists',
    isPast: false
  },

  // Past Events
  {
    title: "Summer Festival 2023",
    date: new Date("2023-12-15"),
    location: "Community Park",
    description: "A wonderful celebration featuring local artists and food vendors. Over 1000 community members gathered to enjoy live music, local cuisine, and family-friendly activities.",
    attendees: 1000,
    highlights: "Live music performances, local food vendors, family activities",
    image: "summer.jpg",
    isPast: true
  },
  {
    title: "Tech Conference 2023",
    date: new Date("2023-11-20"),
    location: "Convention Center",
    description: "Industry experts shared insights on emerging technologies. The conference featured 12 speakers and hosted workshops on AI, blockchain, and cybersecurity.",
    attendees: 500,
    highlights: "Expert speakers, interactive workshops, networking sessions",
    image: "techconf.jpg",
    isPast: true
  },
  {
    title: "Charity Marathon",
    date: new Date("2023-10-05"),
    location: "City Center",
    description: "Annual marathon that raised funds for local charities. We raised over R100,000 for local children's hospitals with 300 participants.",
    attendees: 300,
    highlights: "R100,000 raised, community participation, health awareness",
    image: "marathon.jpg",
    isPast: true
  }
];

const seedDB = async () => {
  try {
    await Event.deleteMany({}); // Clear existing events
    await Event.insertMany(allEvents);
    console.log('Database seeded successfully with all events!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDB();
