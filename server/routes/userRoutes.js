const express=require('express')
const { 
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
 } = require('../controllers/userCtrl')
const authMiddleware = require('../middlewares/authMiddleware')
const router=express.Router()

//routes
//LOGIN || POST
router.post('/login',loginController)

//REGISTER || POST
router.post('/register',registerController)

//Auth || POST
router.post('/getUserData',authMiddleware,authController)

//Apply Doctor || POST
router.post('/apply-doctor',authMiddleware,applyDoctorController)

//Notification Doctor || POST
router.post('/get-all-notification', authMiddleware ,getAllNotificationController)

//Notification Doctor || POST
router.post('/delete-all-notification', authMiddleware ,deleteAllNotificationController)

//Get all Doctors || GET
router.get('/getAllDoc',authMiddleware,getAllDoctors)

//BOOK APPOINTMENT || POST
router.post('/book-appointment', authMiddleware, bookAppointmentCtrl)

//Booking Availability
router.post('/booking-availability', authMiddleware, bookingAvailability)

//Appointments list
router.get('/user-appointments', authMiddleware, userAppointmentsCtrl)
module.exports=router