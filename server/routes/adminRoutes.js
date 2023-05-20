const {
    getAllUsers,
    getAllDoctors,
    changeAccountStatus
} =require('../controllers/adminCtrl')
const express = require('express')
const router=express.Router()
const authMiddleware=require('../middlewares/authMiddleware')


//GET METHOD || USERS
router.get('/getAllUsers',authMiddleware,getAllUsers)

//GET METHOD || DOCTORS
router.get('/getAllDoctors',authMiddleware,getAllDoctors)

//POST METHOD || ACCOUNT STATUS
router.post('/changeAccountStatus',authMiddleware,changeAccountStatus)
module.exports = router