const express = require('express');
const app = express();
const mongoose = require("mongoose");
const dotenv = require('dotenv');

//Import routes

const authRoute = require('./routes/auth');

dotenv.config();



//connect to DB
mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser:true, useUnifiedTopology: true} , ()=> console.log('connected to DB'));

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//Route middlewares
app.use('/api/user', authRoute);





app.listen(5000, () => console.log('Server up and running'));
