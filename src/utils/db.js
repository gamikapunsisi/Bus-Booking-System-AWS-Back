const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        // const conn = await mongoose.connect("mongodb+srv://:hQNOlOISeRWyTu0G@cluster0.qgbna.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        const conn = await mongoose.connect("mongodb+srv://gpunsisi14:gamika@bus-seats-booking.rj7ui.mongodb.net/?retryWrites=true&w=majority&appName=bus-seats-booking")

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB; 