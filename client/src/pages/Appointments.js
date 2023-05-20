import React, { useState,useEffect } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Table, message } from 'antd'
import moment from 'moment'

function Appointments() {

    const [ appointments, setAppointments ] = useState([])
    const {user} = useSelector(state => state.user)
    
    
    const getAppointments = async() => {
        try {
            const res = await axios.get(
                "http://localhost:8080/api/v1/user/user-appointments",
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

    const columns = [
        {
            title:'ID',
            dataIndex:'_id'
        },
        // {
        //     title:'Name',
        //     dataIndex:'name',
        //     render:(text,record) => (
        //         <span>
        //             {record.doctorId.firstName} {record.doctorId.lastName}
        //         </span>
        //     )
        // },
        // {
        //     title:'Phone',
        //     dataIndex:'phone',
        //     render:(text,record) => (
        //         <span>
        //             {record.phone} 
        //         </span>
        //     )
        // },
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
        }
    ]
  return (
    <Layout>
      <h1>Appointment Lists</h1>
      <Table columns={columns} dataSource={appointments}/>
    </Layout>
  )
}

export default Appointments
