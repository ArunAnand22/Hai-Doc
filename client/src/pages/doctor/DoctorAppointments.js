import React, { useState,useEffect } from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Table, message } from 'antd'
import moment from 'moment'

function DoctorAppointments() {

    const [ appointments, setAppointments ] = useState([])
    const {user} = useSelector(state => state.user)
    
    
    const getAppointments = async() => {
        try {
            const res = await axios.get(
                "http://localhost:8080/api/v1/doctor/get-doctorappointments",
                {
                    headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            })  
            if(res.data.success){
                setAppointments(res.data.data)
            }  
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(()=>{
        getAppointments()
    },[])

    const handleStatus =async(record,status) => {
        try {
            const res = await axios.post(
                "http://localhost:8080/api/v1/doctor/update-status",{
                    appointmentsId:record._id,status
                },
                {
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem('token')}`
                    }
                })
                if(res.data.success){
                    message.success(res.data.message)
                    getAppointments()
                }
        } catch (error) {
            console.log(error);
            message.error("Something went wrong")
        }
    }

    const columns = [
        {
            title:'ID',
            dataIndex:'_id'
        },
        {
            title:'Date',
            dataIndex:'date',
            render:(text,record) => (
                <span>
                    {moment(record.doctorId.date).format('DD-MM-YYYY')} 
                </span>
            )
        },
        {
            title:'Status',
            dataIndex:'status'
        },
        {
            title:'Actions',
            dataIndex:'actions',
            render:(text,record)=>(
                <div className="d-flex">
                    {record.status === 'pending' && (
                        <div className="d-flex">
                            <button className='btn btn-success'
                            onClick={() => handleStatus(record,'approved')}>
                                Approve
                            </button>
                            <button className='btn btn-danger ms-2'
                            onClick={() => handleStatus(record,'reject')}>
                                Reject
                            </button>
                        </div>
                    )}
                </div>
            )
        }
    ]

  return (
    <Layout>
      <h1>Appointment</h1>
      <Table columns={columns} dataSource={appointments}/>
    </Layout>
  )
}

export default DoctorAppointments
