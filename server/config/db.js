const mongoose=require('mongoose')
const dotenv=require('dotenv')
const colors=require('colors')


const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB)
        console.log(`Connected to mongodb`.bgGreen.white);
    } catch (error) {
        console.log(`Mongodb server error ${error}`.bgRed.green);
    }
}

module.exports=connectDB