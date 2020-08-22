const  router = require('express').Router();
const Post = require('../models/post');
const verify = require('../middlewares/verifyToken');
const {postValidation} = require('../validation');







router.post('/', verify, async (req,res) =>{

    //lets validate the data before we create a post
    const { error } = postValidation(req.body);
  if (error) {
      return res.status(400).send({ error: error.details[0].message });
  }

 //CREATING POST

    const post = new Post({
        author:req.body.author,
        title:req.body.title,
        content:req.body.content
    });
    try{
        const savedPost = await post.save();
        res.send(post);
    }catch(err){
        console.log(err);
        res.status(400).send(err);
    }
});

//reading a post
router.get('/', async (req,res) =>{


    try{
        const savedPost = await Post.find();
        res.status(200).send(savedPost);
    }catch(err){
        console.log(err);
        res.status(400).send(err);
    }
});


//deleting a post
router.delete('/:_id', verify, async (req,res) =>{


    try{
        const deletedPost = await Post.findByIdAndDelete({_id:req.params._id});
        if(!deletedPost) return res.status(404).send({message:"Post not found"})
        res.status(200).send({message:"Post deleted"});
    }catch(err){
        console.log(err);
        res.status(400).send(err);
    }
});



//Updating a post
router.put('/:_id', verify, async (req,res) =>{


    try{
        const updatedPost = await Post.findByIdAndUpdate({_id:req.params._id},{
            title: req.body.title,
            content: req.body.content
        },{new:true});
        if(!updatedPost) return res.status(404).send({message:"Post not found"})
        res.status(200).send({message:"Post updated!",updatedPost});
    }catch(err){
        console.log(err);
        res.status(400).send(err);
    }
});




module.exports = router;
