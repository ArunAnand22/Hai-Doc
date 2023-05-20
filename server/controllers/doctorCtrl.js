const doctorModel= require('../models/doctorModel')

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

module.exports = {
    getDoctorInfo,
    updateProfileController,
    getDoctorById
}