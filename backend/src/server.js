import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectDB from './db/db.js'
import rout from './router/authRouter.js'
import Notes from './router/NotesRouter.js'

dotenv.config()
const app = express()

const PORT = process.env.PORT


app.use(express.json())
app.use(cookieParser())
app.use(cors({ 
    origin: "https://notes-app-two-rosy.vercel.app",
    credentials: true,
}))
app.use(express.urlencoded({extended:true}))

// Router API 
app.use('/api',rout)
app.use('/note',Notes)
app.get('/',(req,res)=>{
    res.json({
        message:'api working Arman'
    })
})


//DB connection 
connectDB()
.then(()=>{console.log('mongoDB connected successfull')})
.catch((err)=>{
    console.log('connection faild',err)
})

// app running port 
app.listen(PORT,()=>[
    console.log(`server is running port : ${process.env.PORT} and server is live `)
])