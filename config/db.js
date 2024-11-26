const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Log the URI for debugging
        console.log('Connecting to MongoDB at:', process.env.MONGO_URI);

        // Connect to the database
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('MongoDB connected successfully.');
    } catch (error) {
        // Log errors for debugging
        console.error('Error connecting to MongoDB:', error.message);
        throw error; // Rethrow to handle in index.js
    }
};

module.exports = connectDB;
