import React,{ useState,useEffect } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import { useParams } from 'react-router'
import { Button, DatePicker,message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import {showLoading,hideLoading} from '../redux/features/alertSlice'
import moment from 'moment'


function BookingPage() {

    const {user} = useSelector(state => state.user)
    const [doctor,setDoctor] = useState([])
    const [date,setDate] = useState()
    const [isAvailable,setIsAvailable] = useState(false)

    const dispatch = useDispatch()
    const params = useParams()
    //get doctor data
    const getDoctorData = async() => {
        try {
            const res = await axios.post(
                "http://localhost:8080/api/v1/doctor/getDoctorById",
            {
            doctorId:params.doctorId
            },{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            })
            if(res.data.success){
                setDoctor(res.data.data)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getDoctorData()
    },[])

    //------------check doctor availability-----------
    const handleAvailability = async() => {
        try {
            dispatch(showLoading())
            const res = await axios.post(
                "http://localhost:8080/api/v1/user/booking-availability",
                {
                    doctorId:params.doctorId,
                    date
                },
                {
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem('token')}`
                    }
                })
                if(res.data.success){
                    setIsAvailable(true)
                    message.success(res.data.message)
                }else{
                    message.error(res.data.message)
                }
                dispatch(hideLoading())
        } catch (error) {
            dispatch(hideLoading())
            console.log(error);
        }
    }
    //------------handle booking appointment-----------
    const handleBooking = async() => {
        try {
            dispatch(showLoading())
            const res = await axios.post(
                "http://localhost:8080/api/v1/user/book-appointment",
            {
                doctorId:params.doctorId,
                userId:user.user._id,
                doctorInfo:doctor,
                userInfo:user.user,
                date:date
            },{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            })
            dispatch(hideLoading())
            if(res.data.success){
                message.success(res.data.message)
            }
        } catch (error) {
            dispatch(hideLoading())
            console.log(error);
        }
     }

  return ( 
    <Layout>
      <h3>Booking Page</h3>
      <div className="container">
        {
            doctor && (
                <>
                <h4>Dr.{doctor.firstName} {doctor.lastName}</h4>
                <h4>Fees: {doctor.feesPerConsultation}</h4>
                <div className="d-flex flex-column w-50">
                    <DatePicker format='DD-MM-YYYY' 
                    onChange={
                        (value) => setDate(moment(value).format('DD-MM-YYYY'))
                    }/>

                    <Button className='btn btn-primary mt-2' onClick={handleAvailability}>
                        Check Availability
                    </Button>
                    
                     <Button className='btn btn-success mt-2' onClick={handleBooking}>
                        Book Now
                    </Button> 
                    
                </div>
                </>
            )
        }
      </div>
    </Layout>
  )
}

export default BookingPage
