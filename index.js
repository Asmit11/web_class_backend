// Importing the packages (express
const express = require('express');
const mongoose = require('mongoose');
const connectDatabase = require('./database/database');
const dotenv = require('dotenv')
const cors = require('cors')
const acceptFormData = require('express-fileupload')

// creating an epxress app
const app = express();

// Configure Cors Policy
const corsOptions = {
    origin: true,
    credentials: true,
    optionSuccessStatus: 200

}
app.use(cors(corsOptions))

// Express Json Config
app.use(express.json())

// Config form Data
app.use(acceptFormData());

// make a static public folder
app.use(express.static("./public"))

// dotenv Configuration
dotenv.config()

// Connecting to database
connectDatabase()

// Defining the port
const PORT = process.env.PORT;  // port for mac 5500, for windows 500

// Making a test endpoint
// Endpoints : POST, GET, PUT, DELETE
app.get('/test', (req, res) => {
    res.send("Test API is working!...")
})

// http://localhost:5500/test

//  configuring routes of user 
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/product', require('./routes/productRoutes'));

// http://localhost:5500/api/user/create

// Starting the server
app.listen(PORT, () => {
    console.log(`Server is Running on port ${PORT}`)
})
