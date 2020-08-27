const app = require("../index");
const request = require("supertest");
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const Message = require('../models/message')
const User = require('../models/user');


describe("/messages",()=>{
    // beforeAll(()=>{
    //     //connect to DB
    //     mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser:true, useUnifiedTopology: true} , ()=> console.log('connected to DB'));

    // })
    afterEach(async()=>{
        await Message.deleteMany()
        
    })
    it("should return status of 200",async(done)=>{
        const user = {
            name: "Bey Faith",
            email:"dr.bey@gmail.com",
            password:"password"
        }
        await new User(user).save()
        const mes = await request(app).post("/api/user/login").send({
            email:"dr.bey@gmail.com",
            password:"password"
        })
        const token = mes.body.token
        console.log(mes.body)
        const message = {
            name: "Bey Faith",
            subject:"Note for you",
            content:"Thank you 2020!"
        }
        const res = await request(app).post("/api/messages").send(message).set('auth-token',token)
        console.log(res.body)
        expect(res.status).toBe(200)
        done()
    })
    
})

