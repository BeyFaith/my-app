const  router = require('express').Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {registerValidation, loginValidation} = require('../validation');







router.post('/register',async (req,res) =>{

    //lets validate the data before we create a user
    const { error } = registerValidation(req.body);
  if (error) {
      return res.status(400).send({ error: error.details[0].message });
  }

 //checking if user is in database

 const emailExist = await User.findOne({email:req.body.email});
 if(emailExist) {
     return res.status(400).send('Email already exists');
 }



//  Hashing passwords

const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(req.body.password,salt);




 //create new user
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword
    });
    try{
        const savedUser = await user.save();
        res.send({user:user._id});
    }catch(err){
        console.log(err);
        res.status(400).send(err);
    }
});



//LOGIN

router.post('/login',async(req,res) => {
  //lets validate the data before we create a user
  const { error } = loginValidation(req.body);
  if (error) { 
      return res.status(400).send({ error: error.details[0].message });
  }

  //checking if email exists

 const user = await User.findOne({email:req.body.email});
 if(!user) { 
     return res.status(400).send('Email doesnt exist');
 }

 //if password is correct
    const validPass = await bcrypt.compare(req.body.password,user.password);
    if(!validPass) {
        return res.status(400).send('Invalid password');
    }


    //create and assign a token
    const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
    res.header('auth-token',token).send(token);
    // res.send('Logged in!');
});

module.exports = router;
