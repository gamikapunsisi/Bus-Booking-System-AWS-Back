
// Load environment variables
require('dotenv').config();

// Import the database connection module
const connectDB = require('./config/db');

// Debugging: Log environment variables
console.log('Starting the application...');
console.log('Environment Variables:', {
    MONGO_URI: process.env.MONGO_URI,
    NODE_ENV: process.env.NODE_ENV,
});

// Connect to the database
(async () => {
    try {
        console.log('Attempting to connect to the database...');
        await connectDB(); // Assuming connectDB is an async function
        console.log('Database connection successful.');
    } catch (err) {
        console.error('Database connection failed:', err.message);
        process.exit(1); // Exit process on failure
    }
})();

// Main function
function main() {
    console.log('Application initialized successfully.');
}

main();
