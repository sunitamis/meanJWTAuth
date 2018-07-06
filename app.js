const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

mongoose.connect(config.database) ;

//Database Connection
mongoose.connection.on('connected', () => {
    console.log('Connected to db '+ config.database);
});

mongoose.connection.on('error', (err) => {
    console.log('Database Error '+ err);
});

const app = express();

const users = require('./routes/users');

//Port Number
const port = 3000;

//Set static Folder
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser Middleware
app.use(bodyParser.json());

//CORS Middleware
app.use(cors());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//Default routing
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

app.use('/users', users);

//Index Route
app.listen(port , () => {
    console.log('Server started at port '+ port);
})