const app = require("../index");
const request = require("supertest");
const mongoose = require("mongoose");
const Post = require('../models/post');


describe("/posts",()=>{
    // beforeAll(()=>{
    //     //connect to DB
    //     mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser:true, useUnifiedTopology: true} , ()=> console.log('connected to DB'));

    // })
    afterEach(async()=>{
        await Post.deleteMany()
        
    })
    it("should return status of 200",async(done)=>{
        const post = {
            author: "Bey Faith",
            title:"Covid-19",
            content:"Are y'all ready for the second lockdown"
        }
        const res = await request(app).post("/api/posts").send(post)
        console.log(res.body)
        expect(res.status).toBe(200)
        done()
    })
    
})

