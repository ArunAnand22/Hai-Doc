import React,{useState} from 'react'
import { Button, message, Form, Input } from 'antd'
import '../styles/loginstyles.css'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { showLoading,hideLoading } from '../redux/features/alertSlice'

function Login() {
    
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const navigate=useNavigate()
    const dispatch=useDispatch()

    const loginHandler=async(e)=>{
        e.preventDefault();
        try {
          dispatch(showLoading())
          const body={
            email,
            password
          }
          const res=await axios.post('http://localhost:8080/api/v1/user/login',body)
          window.location.reload()
          dispatch(hideLoading())
          if(res.data.success){
            localStorage.setItem("token",res.data.token)
            message.success('Login success')
            navigate('/')
          }else{
            message.error(res.data.message)
          }
        } catch (error) {
          dispatch(hideLoading())
          console.log(error);
          message.error("Something went wrong")
        }
    }

  return (
    <>
    <div className="form-container">
        <Form layout='vertical' className='login-form'>
            <h3 className='text-center'>Login</h3>
          <Form.Item label="email" name="email">
            <Input type='email' required onChange={(e)=>setEmail(e.target.value)}/>  
          </Form.Item>
          <Form.Item label="password" name="password">
            <Input type='password' required onChange={(e)=>setPassword(e.target.value)}/>  
          </Form.Item>
          <Button className='btn btn-info mb-2' onClick={loginHandler}>Login</Button><br/>
          <span>New here? <Link to='/register' className='text-info'>Register</Link></span>   
        </Form>
    </div>
    </>
  )
}

export default Login