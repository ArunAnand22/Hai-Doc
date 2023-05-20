const doctorModel = require('../models/doctorModel')
const userModel = require('../models/userModels')

//get all users
const getAllUsers = async(req,res) => {
    try {
    const users = await userModel.find({})
    if(users){
        res.status(200).send({
            success:true,
            message:"Users found",
            data:users
        })
    }else{
        res.status(200).send({
            success:false,
            message:"Users unable to send"
        })
    }        
    } catch (error) {
        console.log(error);
        res.status(403).send({
            message:"Error while sending users",
            success:false,
            error
        })
    }
}

//get all doctors
const getAllDoctors = async(req,res) => {
    try {
        const doctors = await doctorModel.find({})
        if(doctors){
            res.status(200).send({
                success:true,
                message:"Doctors found",
                data:doctors
            })
        }else{
            res.status(200).send({
                success:false,
                message:"Doctors data unable to send"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(403).send({
            message:"Error while sending doctors data",
            success:false,
            error
        })
    }
}

//doctor change account status
const changeAccountStatus = async(req,res) => {
    try {
        const { doctorId,status } = req.body
        const doctor = await doctorModel.findByIdAndUpdate(doctorId,{status}) 
        const user = await userModel.findOne({_id:doctor.userId})
        const notification = user.notification
        notification.push({
            type:'doctor-account-request-accepted',
            message:`Your doctor request has ${status}`,
            onCickPath:'/notification'
        })
        user.isDoctor = status === 'approved' ? true : false 
        await user.save()
        res.status(201).send({
            success:true,
            message:"Account status updated",
            data:doctor
        })      
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success:false,
            message:"Error changing status",
            error
        })
    }
}

module.exports = {
    getAllDoctors,
    getAllUsers,
    changeAccountStatus
}