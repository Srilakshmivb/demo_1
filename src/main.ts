import * as dotenv from 'dotenv';
dotenv.config();

import express, {Request, Response, NextFunction } from 'express'
import {json, urlencoded} from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors'
import { newPostRouter, 
        newCommentRouter, 
        updatePostRouter, 
        deleteCommentRouter, 
        deletePostRouter,
        showPostRouter 
} from './routers';

const app = express();
app.use( cors (
    {
    origin: "*",
    optionsSuccessStatus: 200  
    } 

))

app.use(urlencoded({
    extended: true
}))
app.use(json())

app.use(newPostRouter)
app.use(deletePostRouter)
app.use(updatePostRouter)
app.use(newCommentRouter)
app.use(deleteCommentRouter)
app.use(showPostRouter)

app.all('*', (req, res,next) => {
    const error = new Error("not found") as CustomError
    error.status = 404;
    next(error)
})

declare global{
    interface CustomError extends Error{
        status ?: number
    }
}
app.use((error: CustomError, req: Request, res: Response, next: NextFunction) => {
    if(error.status){
        res.status(error.status).json({ message:error.message})
    }
    res.status(500).json({ message: 'something went wrong'})
})
const start = async () =>{
    if(!process.env.MONGO_URI) throw new Error("MONGO_URI is required.")
    try{
console.log(process.env.MONGO_URI)
          await mongoose.connect(process.env.MONGO_URI)
    } catch {
     throw new Error("DB Error")
    }
    app.listen(3000, () => console.log('Server is up and running with 3000 successfully'))
}

start()