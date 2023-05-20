import axios from 'axios'
import Layout from '../../components/Layout'
import React,{ useState,useEffect } from 'react'
import { Table, message } from 'antd'

function Doctors() {

    const [doctors,setDoctors] = useState([])
    const getAllDoctors = async() => {
        try {
            const doctorResult = await axios.get("http://localhost:8080/api/v1/admin/getAllDoctors",{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            if(doctorResult.data.success){
                setDoctors(doctorResult.data.data)
            }
        } catch (error) {
            console.log(error);
        }
    }
    //handle account status
    const handleAccountStatus = async(record,status) => {
        try {
            const res=await axios.post("http://localhost:8080/api/v1/admin/changeAccountStatus",
            {
                doctorId:record._id,userId:record.userId,status:status
            },
            {
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            if(res.data.success){
                message.success(res.data.message)
            }
            window.location.reload()
        } catch (error) {
            console.log(error);
            message.error('Something went wrong')
        }
    }
    useEffect(()=>{
        getAllDoctors()
    },[])
 
    
     //antd table col
     const columns = [
        {
            title:'Name',
            dataIndex:'name',
            render:(text,record) => (
                <span>{record.firstName} {record.lastName}</span>
            )
        },
        {
            title:'Status',
            dataIndex:'status'
        },
        {
            title:'Phone',
            dataIndex:'phone',
        },
        {
            title:'Actions',
            dataIndex:'actions',
            render:(text,record) => (
                <div className='d-flex'>
                    {
                        record.status === 'pending' ? 
                        ( <button className='btn btn-success' onClick={()=>handleAccountStatus(record,'approved')}>Approve</button> ) :
                        ( <button className='btn btn-danger'>Reject</button> )
                    }
                </div>
            ) 
        }
    ]
  return (
    <Layout>
      <h1 className='p-3'>All Doctors</h1>
    <Table columns={columns} dataSource={doctors}/>
    </Layout>
  )
}

export default Doctors
