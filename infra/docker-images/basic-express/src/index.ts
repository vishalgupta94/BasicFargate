import express from "express";
import {Request,Response} from "express";
const app = express()

app.get("/",(req:Request ,res:Response)=>{
    res.status(202).send("hello world")
})

app.get("/abcd",(req:Request ,res:Response)=>{
    res.status(202).json({
        body: "abcd response"
    })
})

app.get("/abcd2",(req:Request ,res:Response)=>{
    res.status(202).json({
        body: "abcd response"
    })
})

app.listen(3000,()=>{
    console.log('Basic Fargate is Running on Port 3000')
})