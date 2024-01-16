import express from 'express'
import mongoose from 'mongoose'
import authRoute from './routes/auth.route.js'
import userRoute from './routes/user.route.js'
import questionRoute from './routes/question.route.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import 'dotenv/config'

const connectDB = async()=>{
    await mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log('connected to db');
    })
    .catch((error)=>{
        console.log(error);
    })
}
const port = process.env.PORT || 8000

const app = express()
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))

app.use(express.json())
app.use(cookieParser())

app.get('/test',(req,res)=>{
    res.status(200).json({message:"everthing is fine.."})
})
app.use('/api',authRoute)
app.use('/api/user',userRoute)
app.use('/api/question',questionRoute)


app.listen(port,()=>{
    console.log(`connected to a port ${port}`);
    connectDB()
})

app.use((err,req,res,next)=>{
    const status = err.status || 500
    const message = err.message || "internal server error..."
    return res.status(status).json(message)
})

