const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/authMiddleware')
const { 
    getDoctorInfo,
    updateProfileController,
    getDoctorById } = require('../controllers/doctorCtrl')

//GET SINGLE DOCTOR || POST
router.post('/getDoctorInfo',authMiddleware, getDoctorInfo)

//POST UPDATE PROFILE
router.post('/updateProfile', authMiddleware, updateProfileController)


//GET SINGLE DOC INFO || POST
router.post('/getDoctorById',authMiddleware, getDoctorById)
module.exports = router