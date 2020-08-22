const  router = require('express').Router();
const Message = require('../models/message');
const verify = require('../middlewares/verifyToken');
const {messageValidation} = require('../validation');







router.post('/', verify, async (req,res) =>{

    //lets validate the data before we create a post
    const { error } = messageValidation(req.body);
  if (error) {
      return res.status(400).send({ error: error.details[0].message });
  }

 //CREATING MESSAGE

    const message = new Message({
        name:req.body.name,
        subject:req.body.subject,
        content:req.body.content
    });
    try{
        const savedMessage = await message.save();
        res.send(message);
    }catch(err){
        console.log(err);
        res.status(400).send(err);
    }
});

//reading a message
router.get('/', async (req,res) =>{


    try{
        const savedMessage = await Message.find();
        res.status(200).send(savedMessage);
    }catch(err){
        console.log(err);
        res.status(400).send(err);
    }
});


//deleting a message
router.delete('/:_id', verify, async (req,res) =>{


    try{
        const deletedMessage = await Message.findByIdAndDelete({_id:req.params._id});
        if(!deletedMessage) return res.status(404).send({message:"Mesage not found"})
        res.status(200).send({message:"Message deleted"});
    }catch(err){
        console.log(err);
        res.status(400).send(err);
    }
});



//Updating a message
router.put('/:_id', verify, async (req,res) =>{


    try{
        const updatedMessage = await Message.findByIdAndUpdate({_id:req.params._id},{
            name: req.body.name,
            subject:req.body.subject,
            content: req.body.content
        },{new:true});
        if(!updatedMessage) return res.status(404).send({message:"Message not found"})
        res.status(200).send({message:"Message updated!",updatedMessage});
    }catch(err){
        console.log(err);
        res.status(400).send(err);
    }
});




module.exports = router;
