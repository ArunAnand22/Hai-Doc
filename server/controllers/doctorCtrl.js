const appointmentModel = require('../models/appointmentModel')
const doctorModel= require('../models/doctorModel')
const userModel = require('../models/userModels')

//get single doctor
const getDoctorInfo = async(req,res) => {
    try {
    const doctor = await doctorModel.findOne({ userId : req.body.userId })
    if(doctor){
        res.status(200).send({
            success:true,
            message:"Doctor data found",
            data:doctor
        })
    }else{
        res.status(200).send({
            success:false,
            message:"Doctor details not found"
        })
    }    
    } catch (error) {
        res.status(400).send({
            success:false,
            message:"Error in fetching doctor",
            error
        })
    }
}
//update profile controller
const updateProfileController = async(req,res) => {
    try {
        const doctor = await doctorModel.findOneAndUpdate({userId:req.body.userId},req.body)
        if(doctor){
            res.status(200).send({
                success:true,
                message:"Doctor update success",
                data:doctor
            })
        }else{
            res.status(200).send({
                success:false,
                message:"Profile updation failed"
            })
        }
    } catch (error) {
        res.status(400).send({
            success:false,
            message:"Profile update not found",
            error
        })
    }
}

//get single doctor by id
const getDoctorById = async(req,res) => {
try {
    const doctor = await doctorModel.findById({_id:req.body.doctorId})
    res.status(200).send({
        success:true,
        message:"Data found",
        data:doctor
    })   
} catch (error) {
    console.log(error);
    res.status(400).send({
        success:false,
        message:"Error",
        error
    })
}
}
//get doctor appointmets
const getDoctorAppointments = async(req,res) => {
    try {
        const doctor = await doctorModel.findOne({userId:req.body.userId})
        const appointment = await appointmentModel.find({doctorId:doctor._id})      
        res.status(200).send({
            success:true,
            message:"Doctor appointment fetched successfully",
            data:appointment
        })  
    } catch (error) {
        res.status(400).send({
            success:false,
            message:"Error in getting doctor notifications",
            error
        })
    }
}
//update status
const updateStatusCtrl = async(req,res) => {
    try {
        const {appointmentsId,status} = req.body
        const appointments = await appointmentModel.findByIdAndUpdate(appointmentsId,{status})
        const user = await userModel.findOne({_id:appointments.userId})
        const notification = user.notification
        notification.push({
            type:'status-updated',
            message:`Your appointment has been updated ${status}`,
            onClickPath:'/doctor-appointments'
        })
        await user.save();
        res.status(200).send({
            success:true,
            message:"Appointment status updated"
        })
    } catch (error) {
        res.status(400).send({
            success:false,
            message:"Error in updateStatus controller"
        })
    }
}

module.exports = {
    getDoctorInfo,
    updateProfileController,
    getDoctorById,
    getDoctorAppointments,
    updateStatusCtrl
}