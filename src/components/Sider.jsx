import React, { useState } from 'react'
import { Link } from "react-router-dom"

const Sider = props => {
     const profile_image= 'https://img.search.brave.com/54b1HChnh3bwIXSQMG1VKasfmxprg-NMe0ezjC1v-n8/fit/880/920/ce/1/aHR0cHM6Ly9jbGlw/Z3JvdW5kLmNvbS9p/bWFnZXMvY2xpcGFy/dC1wcm9maWxlLTYu/anBn'

     const [active, setactive] = useState("home")

     const reveal = (e) =>{
         if(active==e){
            setactive("")
         }else{ 
             setactive(e)
            }
     }
     
 
     const closeClose = () =>{
         setactive(false)
     }


     const logOut =()=>{
        localStorage.removeItem('access');
     }

    return (
           <div className="sidebar">
                <div className="bg_shadow"onClick={()=>props.closeClose()} />
                <div className="sidebar_inner">
                    <div className="close" onClick={()=>props.closeClose()}>
                    <i className="fas fa-times" />
                    </div>
                    <div className="profile_info">
                    <div className="profile_img">
                        <img src={profile_image} alt="profile_img" />
                    </div>
                    <div className="profile_data">
                        <p className="name">(tofunmi okedeji)</p>
                        {/* <span><i className="fas fa-map-marker-alt" /> Texas, USA</span> */}
                    </div>
                    </div>
                    <ul className="siderbar_menu">
                    <li onClick={()=>reveal("home")} className={active=="home"? "home" : ""}><Link to="">
                        <div className="icon"><i className="fas fa-heart" /></div>
                        <div className="title">Home</div>
                        </Link> 
                    </li>  
                    <li onClick={()=>reveal("bus")} className={active=="bus"? "active" : ""}><Link >
                        <div className="icon"><i className="fas fa-user" /></div>
                        <div className="title">Bus Actions</div>
                        <div className="arrow"><i className="fas fa-chevron-down" /></div>
                        </Link>
                        <ul className="accordion">
                        <li><Link to="/create-bus">Create Bus</Link></li>
                        
                        <li><Link to="/in-use">Busses in use</Link></li>
                        <li><Link to="/good-vehicles">Good Busses</Link></li>
                        <li><Link to="/bad-vehicles">Bad Busses</Link></li>
                        <li><Link to="/fair-vehicles">Fair Busses</Link></li>
                        <li><Link to="/currently-fixed">Curently fixed</Link></li>
                        </ul>
                    </li>  
                    <li onClick={()=>reveal("location")} className={active=="location"? "active" : ""}><a href="#">
                        <div className="icon"><i className="fas fa-receipt" /></div>
                        <div className="title">Location Actions</div>
                        <div className="arrow"><i className="fas fa-chevron-down" /></div>
                        </a>
                        <ul className="accordion">
                        <li><Link to='/create-location'>Add Location</Link></li>
                        <li><Link to='/destinations'>Destinations</Link></li>
                        
                        </ul>
                    </li>  
                    <li onClick={()=>reveal("allocate")} className={active=="allocate"? "active" : ""}><a href="#">
                        <div className="icon"><i className="fas fa-credit-card" /></div>
                        <div className="title">Allocation Actions</div>
                        <div className="arrow"><i className="fas fa-chevron-down" /></div>
                        </a>
                        <ul className="accordion">
                        <li><Link to='/allocate'>Allocate Bus</Link></li>
                        <li><Link to='/ '>view all free Busses</Link></li>
                  
                        </ul>
                    </li>  
                   
                    </ul>
                    <div className="logout_btn">
                    <Link onClick={logOut} to="/login">Logout</Link>  
                    </div>
                </div>
            </div>

            
    )
}



export default Sider
