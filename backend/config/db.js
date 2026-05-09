const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {});
        console.log('MongoDB connected');
    } catch (error) {
        console.error("MongoDB connection error: ", error);
        process.exit(1); //Node.js way to immediately stop your application and signal that something went wrong
    }
};

module.exports = connectDB;