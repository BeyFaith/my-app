const express = require('express');
const app = express();
const mongoose = require("mongoose");
const dotenv = require('dotenv');

//Import routes

const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const messageRoute = require('./routes/messages')

dotenv.config();



//connect to DB
mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser:true, useUnifiedTopology: true} , ()=> console.log('connected to DB'));

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//Route middlewares
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/messages', messageRoute);
app.use('/', (req,res)=>{
    res.status(200).send({
        message: "Welcome to my app!"
    })
});

module.exports = app;