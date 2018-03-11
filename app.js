const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Database connection + Check if we're connected
mongoose.connect(config.database);
mongoose.connection.on('connected',() => {
    console.log('Connected to database' + config.database);
})
mongoose.connection.on('error',(error) => {
    console.log('database error' + error);
})

const app = express();
const users = require('./routes/users');


// Port number
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());


// set static folder and folders. 
app.use(express.static(path.join(__dirname, 'public')));
app.use('/users', users);


// Index route
app.get('/', (req, res ) => {
    res.send('hello');
})

// Start server
app.listen(port, ()=> {
    console.log('Server started on ' + port)
});