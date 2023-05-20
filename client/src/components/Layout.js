import React from 'react'
import '../styles/layoutStyles.css'
import { adminMenu, userMenu } from '../Data/data'
import { Link,useNavigate,useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { message,Badge } from 'antd'

function Layout({children}) {

    const location = useLocation()
    const  { user }  = useSelector(state=>state.user)
    const navigate=useNavigate()
    
    //doctor menu
    const doctorMenu = [
        {
            name:"Home",
            path:"/",
            icon:"fa-solid fa-house"
        },
        {
            name:"Appointments",
            path:"/appointments",
            icon:"fa-solid fa-list"
        },
        {
            name:"Profile",
            path:`/doctor/profile/${user?.user._id}`,
            icon:"fa-solid fa-user"
        }
    ]
    //doctor menu end

    //menu list
    const SidebarMenu = (user && user.user.isAdmin) 
    ? adminMenu 
    : (user && user.user.isDoctor)
    ? doctorMenu 
    : userMenu; 
    
    //logout
    const handleLogout=()=>{
        localStorage.clear()
        message.success('Logout successful')
        navigate('/login')
    }
  return (
    <>
    <div className="main">
        <div className="layout">
            <div className="sidebar">
                <div className="logo">
                    <h6>HAI DOC!</h6>
                    <hr/>
                </div>
                <div className="menu">
                    {SidebarMenu.map(menu => {
                        const isActive = location.pathname == menu.path
                        return (
                            <>
                            <div className={`menu-item ${isActive && 'active'}`}>
                                <i className={menu.icon}></i>
                                <Link to={menu.path}>{menu.name}</Link>
                            </div>
                            </>
                        )
                    })}
                    <div className={`menu-item`} onClick={handleLogout}>
                                <i className="fa-solid fa-right-from-basket"></i>
                                <Link to="/login">Logout</Link>
                            </div>
                </div>
            </div>
            <div className="content">
                <div className="header">
                    <div className="header-content">
                    <Badge count={user && user.user.notification.length}
                     onClick={()=>{navigate("/notification")}} style={{cursor:"pointer"}}>
                    <i class="fa-solid fa-bell"></i>
                    </Badge>
                    <Link to="/profile">{user && user.user.name}</Link>
                    </div>
                </div>
                <div className="body">{children}</div>
            </div>
        </div>
    </div>   
    </>
  )
}

export default Layout
