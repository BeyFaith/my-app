const app = require("../index");
const request = require("supertest");
const mongoose = require("mongoose");
const User = require('../models/user');


describe("/register",()=>{
    // beforeAll(()=>{
    //     //connect to DB
    //     mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser:true, useUnifiedTopology: true} , ()=> console.log('connected to DB'));

    // })
    afterEach(async()=>{
        await User.deleteMany()
    })
    it("should return status of 201",async(done)=>{
        const user = {
            name: "Bey Faith",
            email:"dr.bey@gmail.com",
            password:"password"
        }
        const res = await request(app).post("/api/user/register").send(user)
        console.log(res.body)
        expect(res.status).toBe(201)
        done()
    })
})

