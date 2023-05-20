import React,{ useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { Col,Form,Input,Row,message } from 'antd'
import { useDispatch } from 'react-redux'
import { showLoading,hideLoading } from '../../redux/features/alertSlice'
import { useNavigate } from 'react-router'

function Profile() {
    const { user } = useSelector( state => state.user )
    const [doctor, setDoctor] = useState(null)
    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate
    //get doctor details
    const getDoctorInfo = async() => {
        try {
            const res = await axios.post("http://localhost:8080/api/v1/doctor/getDoctorInfo",
            {
                userId:params.id
            },
            {
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
        getDoctorInfo()
    },[])
    //update doc
    const handleFinish = async(values) => {
        try {
            dispatch(showLoading())
            const res = await axios.post(
                'http://localhost:8080/api/v1/doctor/updateProfile',
            {
                ...values,userId:user._id
            },
            {
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
            })
            dispatch(hideLoading())
            if(res.data.success){
                message.success(res.data.message)
                navigate('/')
            }else{
                message.error(res.data.message)
            }
        } catch (error) {
            dispatch(hideLoading())
            console.log(error);
        }
    }
    //update doc end

  return (
    <Layout>
      <h1>Manage profile</h1>
      {
        doctor && (
    <>
      <h2 className='text-center'>Apply doctor</h2>
      <Form layout='vertical' onFinish={handleFinish} className='m-3'
       initialValues={doctor}>
            <h4 className='text-secondary'>Personal Details :</h4>
        <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
                <Form.Item label="First Name" name="firstName" required rules={[{required:true}]}>
                    <Input type='text' placeholder='First Name'/>
                </Form.Item>
            </Col>
            
            <Col xs={24} md={24} lg={8}>
                <Form.Item label="Last Name" name="lastName" required rules={[{required:true}]}>
                    <Input type='text' placeholder='Last Name'/>
                </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
                <Form.Item label="Phone No:" name="phone" required rules={[{required:true}]}>
                    <Input type='text' placeholder='Phone'/>
                </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
                <Form.Item label="Email" name="email" required rules={[{required:true}]}>
                    <Input type='email' placeholder='Email'/>
                </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
                <Form.Item label="Website" name="website" required rules={[{required:true}]}>
                    <Input type='text' placeholder='Website'/>
                </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
                <Form.Item label="Address" name="address" required rules={[{required:true}]}>
                    <Input type='text' placeholder='Address'/>
                </Form.Item>
            </Col>
            </Row>
            <h6 className='text-secondary'>Professional Details :</h6>
            <Row>
            <Col xs={24} md={24} lg={8}>
                <Form.Item label="Specialization" name="specialization" required rules={[{required:true}]}>
                    <Input type='text' placeholder='Specialization'/>
                </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
                <Form.Item label="Experience" name="experience" required rules={[{required:true}]}>
                    <Input type='text' placeholder='Experience'/>
                </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
                <Form.Item label="Fees per Consultation" name="feesPerConsultation" required rules={[{required:true}]}>
                    <Input type='text' placeholder='consultation fees'/>
                </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
                
            </Col>
            <Col xs={24} md={24} lg={8}></Col>
            <Col xs={24} md={24} lg={8}>
            <button className='btn btn-primary' type='submit'>Update</button>
            </Col>
        </Row>
      </Form>
    </>
        )
      }
    </Layout>
  )
}

export default Profile
