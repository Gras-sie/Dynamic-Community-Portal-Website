// Connects our website to MongoDB
const mongoose = require('mongoose');

// Try to connect to the database
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/community_portal');
        console.log(`Connected to MongoDB!`);
    } catch (error) {
        console.error('Oops! Database connection failed:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
