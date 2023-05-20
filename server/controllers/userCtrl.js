const userModel=require('../models/userModels')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const dotenv=require('dotenv')
const doctorModel = require('../models/doctorModel')
const appointmentModel = require('../models/appointmentModel')
const moment = require('moment')

//----------------register handler-----------------
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
//------------------login handler----------------------
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
//---------------Auth-------------------------------
const authController = async(req,res) => {
    try {
        const user = await userModel.findById({_id:req.body.userId})
        user.password = undefined
        if(!user){
            return res.status(200).send({message:"User not found",success:false})
        }else{
            return res.status(200).send({
                success:true,
                data:{
                    user
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
//----------------------apply doctor-------------------
const applyDoctorController = async(req,res) => {
    try {
        const newDoctor = await doctorModel({...req.body,status:'pending'})
        await newDoctor.save()
        const adminUser=await userModel.findOne({isAdmin:true})
        const notification = adminUser.notification
        notification.push({
            type:'apply-doctor-request',
            message:`${newDoctor.firstName} ${newDoctor.lastName} has applied for a doctor account`,
            data:{
                doctorId:newDoctor._id,
                name:newDoctor.firstName + " " + newDoctor.lastName,
                onClickPath:'/admin/doctors'
            }
        })
        await userModel.findByIdAndUpdate(adminUser._id,{notification})
        res.status(200).send({
            success:true,
            message:'Doctor account applied successfully'
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            message:'Error while applying for doctor',
            success:false,
            error
        })
    }
}
//---------------------Notification controller-------------------
const getAllNotificationController = async(req,res) => {
try {
    const user = await userModel.findOne({_id:req.body.userId})
    const seennotification = user.seennotification
    const notification = user.notification
    seennotification.push(...notification)
    user.notification = []
    user.seennotification = notification
    const updatedUser = await user.save()
    res.status(200).send({
        success:true,
        message:"all notification marked as read",
        data:updatedUser
    })
} catch (error) {
    console.log(error);
    res.status(400).send({
        message:"Error in notification",
        success:false,
        error
    })
}
}

//----------------delete all notification----------------------
const deleteAllNotificationController = async(req,res) => {
    try {
    const user = await userModel.findOne({_id:req.body.userId})
    user.notification = []
    user.seennotification = []
    const updateUser = await user.save()
    updateUser.password=undefined
    res.status(200).send({
        success:true,
        message:"Notifications deleted successfully",
        data:updateUser
    })        
    } catch (error) {
        console.log(error);
        res.status(400).send({
            message:"Error in delete notification",
            success:false,
            error
        })
    }
}

//-------------------get all doctors---------------------
const getAllDoctors = async(req,res) => {
    try {
        const doctors = await doctorModel.find({status:'approved'})
        if(doctors){
            res.status(200).send({
                success:true,
                message:"Getting all doctors is a success",
                data:doctors
            })
        }else{
            res.status(200).send({
                success:false,
                message:"Doctors not found"
            })
        }
    } catch (error) {
        res.status(400).send({
            success:false,
            message:'Getting all doctors error',
            error
        })
    }
}
//--------------book appointment-------------------------
const bookAppointmentCtrl = async(req,res) => {
    try {
        req.body.date = moment(req.body.date,'DD-MM-YYYY').toISOString()
        req.body.status = 'pending'
        const newAppointment = new appointmentModel(req.body)
        await newAppointment.save()
        const user = await userModel.findOne({_id:req.body.doctorInfo.userId})
        user.notification.push({
            type:'new-appointment-request',
            message:`A new appointment request from ${req.body.userInfo.name}`,
            onClickPath:'/user/appointments'
        })
        await user.save()
        res.status(200).send({
            success:true,
            message:"Appointment booked successfully"
        })
    } catch (error) {
        res.status(400).send({
            success:false,
            message:"Appointment booking error",
            error
        })
    }
}
//------------booking availability----------------------
const bookingAvailability= async(req,res) => {
    try {
        const date = moment(req.body.date,'DD-MM-YYYY').toISOString()
        const doctorId = req.body.doctorId
        const appointments = await appointmentModel.find({doctorId,date})
        if(appointments.length > 10){
            return res.status(300).send({
                success:false,
                message:"No room available for appointment"
            })
        }else{
            return res.status(200).send({
                success:true,
                message:"Available for appointment"
            })
        } 
    } catch (error) {
        res.status(200).send({
            success:false,
            message:"Booking availability error",
            error
        })
    }
}
//get user appointments
const userAppointmentsCtrl = async(req,res) => {
    try {
        const appointments = await appointmentModel.find({userId:req.body.userId})
        if(appointments){
            res.status(200).send({
                success:true,
                message:"Appointments found",
                data:appointments
            })
        }else{
            res.status(200).send({
                success:false,
                message:"No data found"
            })
        }
    } catch (error) {
        res.status(400).send({
            success:false,
            message:"Error in getting appointments",
            error
        })
    }
}
//export
module.exports={
    loginController,
    registerController,
    authController,
    applyDoctorController,
    getAllNotificationController,
    deleteAllNotificationController,
    getAllDoctors,
    bookAppointmentCtrl,
    bookingAvailability,
    userAppointmentsCtrl
}