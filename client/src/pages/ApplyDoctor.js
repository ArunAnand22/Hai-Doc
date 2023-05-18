import React from 'react'
import Layout from '../components/Layout'
import { Form,Input,Col,Row,TimePicker,message } from 'antd'
import axios from 'axios'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import {showLoading,hideLoading} from '../redux/features/alertSlice'

function ApplyDoctor() {

    const {user} = useSelector(state => state.user)
    const navigate=useNavigate()
    const dispatch=useDispatch()

    //handle form
    const handleFinish = async(values) => {
        try {
            dispatch(showLoading())
            const res = await axios.post('http://localhost:8080/api/v1/user/apply-doctor',{...values,userId:user._id},{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
            })
            dispatch(hideLoading())
            if(res.data.success){
                message.success(res.data.success)
                navigate('/')
            }else{
                message.error(res.data.message)
            }
        } catch (error) {
            dispatch(hideLoading())
            console.log(error);
            message.error('Something went wrong')
        }
    }

  return (
    <Layout>
      <h2 className='text-center'>Apply doctor</h2>
      <Form layout='vertical' onFinish={handleFinish} className='m-3'>
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
                <Form.Item label="Timings" name="timings" required rules={[{required:true}]}>
                    <TimePicker.RangePicker format="HH:mm"/>
                </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}></Col>
            <Col xs={24} md={24} lg={8}>
            <button className='btn btn-primary' type='submit'>Submit</button>
            </Col>
        </Row>
      </Form>
    </Layout>
  )
}

export default ApplyDoctor
