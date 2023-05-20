import React,{ useState,useEffect } from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import { Table } from 'antd'

function Users() {
    const [users,setUsers] = useState([])

    //getUsers
    const getUsers = async() => {
        try {
            const users = await axios.get("http://localhost:8080/api/v1/admin/getAllUsers",{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            if(users.data.success){
                setUsers(users.data.data)
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        getUsers()
    },[])

    //antd table col
    const columns = [
        {
            title:'Name',
            dataIndex:'name',
        },
        {
            title:'Email',
            dataIndex:'email'
        },
        {
            title:'Created At',
            dataIndex:'isDoctor',
            render:(text,record)=>(
                <span>{record.isDoctor?'Yes':'No'}</span>
            )
        },
        {
            title:'Actions',
            dataIndex:'actions',
            render:(text,record) => (
                <div className='d-flex'>
                    <button className='btn btn-danger'>Block</button>
                </div>
            ) 
        }
    ]

  return (
    <Layout>
        <h1 className='p-3'>All Users</h1>
        <Table columns={columns} dataSource={users}/>
    </Layout>
  )
}

export default Users
