const express=require('express')
const colors=require('colors')
const morgan=require('morgan')
const dotenv=require('dotenv')
const connectDB=require('./config/db')
const cors=require('cors')

//config dotenv
dotenv.config()
//mongodb connection
connectDB()
//rest object
const app=express()
//middleware
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
//routes
app.use('/api/v1/user',require('./routes/userRoutes'))
app.use('/api/v1/admin',require('./routes/adminRoutes'))
app.use('/api/v1/doctor',require('./routes/doctorRoutes'))

//port
const PORT=process.env.PORT || 8080
//listen port
app.listen(PORT,()=>{
console.log(`Running on ${process.env.NODE_MODE} mode on port ${PORT}`.bgCyan.white)
})