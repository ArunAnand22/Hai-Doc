import React,{useState} from 'react'
import { Button, Form, Input,message } from 'antd'
import '../styles/registerstyles.css'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'

function Register() {

    const[name,setName]=useState('')
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const navigate=useNavigate();
    //form handler
    const onFinishHandler=async()=>{
        try {
            const body={
              name,
              email,
              password
            }
            const res=await axios.post('http://localhost:8080/api/v1/user/register',body)
            if(res.data.success){
                message.success('Register success')
                navigate('/login')
            }else{
                message.error(res.data.message)
            }
        } catch (error) {
            console.log(error);
            message.error("Something went wrong")
        }
    }

  return (
    <>
    <div className="form-container">
        <Form layout='vertical' className='register-form'>
          <h3 className='text-center'>Register Form</h3>
          <Form.Item label="name" name="name">
            <Input type='text' required onChange={e=>setName(e.target.value)}/>  
          </Form.Item>
          <Form.Item label="email" name="email">
            <Input type='email' required onChange={e=>setEmail(e.target.value)}/>  
          </Form.Item>
          <Form.Item label="password" name="password">
            <Input type='password' required onChange={e=>setPassword(e.target.value)}/>  
          </Form.Item>
          <Button className='btn btn-primary mb-2' onClick={onFinishHandler}>Register</Button><br/>         
          <span>Already a user? <Link  to='/login' className='text-primary'>Login</Link></span>

        </Form>
    </div>
    </>
  )
}

export default Register