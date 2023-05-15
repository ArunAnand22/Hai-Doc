const userModel=require('../models/userModels')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const dotenv=require('dotenv')

//register handler
const registerController = async(req,res) => {
    try {
        const existingUser = await userModel.findOne({email:req.body.email})
        if(existingUser){
            return res.status(200).json({success:false,message:"User already exists"})
        }
        const password=req.body.password
        ///bcrypt password
        const salt=await bcrypt.genSalt(10) 
        const hashedPassword=await bcrypt.hash(password,salt)
        req.body.password=hashedPassword
        const newUser = new userModel({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        })
        await newUser.save()
        res.status(201).send({success:true,message:"Registration success"})
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message:`Register failed:${error.message}`})
    }
}
//login handler
const loginController = async(req,res) => {
    try {
        const user=await userModel.findOne({email:req.body.email})
        if(!user){
            return res.status(200).send({message:`User does not exist`,success:false})
        }else{
            const isMatch = await bcrypt.compare(req.body.password,user.password)
            if(!isMatch){
                return res.status(200).send({message:`Invalid input`,success:false})
            }
            //jwttoken
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1d'})
            res.status(200).send({message:"Login success",success:true,token})
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({message:`Error in login ctrl ${error.message}`})
    }
}
//Auth
const authController = async(req,res) => {
    try {
        const user = await userModel.findOne({_id:req.body.userId})
        if(!user){
            return res.status(200).send({message:"User not found",success:false})
        }else{
            return res.status(200).send({
                success:true,
                data:{
                    name:user.name,
                    email:user.email
                }
            })
        } 
    } catch (error) {
        console.log(error);
        res.status(400).send({
            message:"Auth failed",
            success:false,
            error
        })
    }
}
module.exports={
    loginController,
    registerController,
    authController
}