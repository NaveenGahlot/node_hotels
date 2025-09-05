const mongoose = require('mongoose');

// Define the MongoDB connection URL 
const mongoURl = 'mongodb://127.0.0.1:27017/hotels' // Replace 'mydatabase' with your database name

// Set up MongoDB connection
mongoose.connection(mongoURl, {
    useNewUrlPlarse: true,
    useUnifiedTopology: true
})

// Get the default connection
// Mongoose maintains a default connection object representing the MongoDB connection. 
const db = mongoose.connection;

// Define event listeners for database connection 

db.on('connected', ()=>{
    console.log('Connected to MongoDB server');
})
db.on('error', (err)=>{
    console.log('MongoDB connection error:- ', err);
})
db.on('disconnected', ()=>{
    console.log('MongoDB disconnected');
})

// Export the database connection 
module.exports = db;