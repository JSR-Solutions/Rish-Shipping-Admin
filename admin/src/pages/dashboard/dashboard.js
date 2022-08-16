import React from 'react'
import Logo from "../../Assets/logo.svg"
import {FiHome} from "react-icons/fi"
import "../../styles/dashboard/dashboard.css"
function dashboard() {
  return (
    <div className="dashboard_main">
        <div className='dash_left'>
            <div className='side_top'>
                <div className='side_top1'>
                    <img src={Logo}/>
                    <h2>Rish Shipping</h2>
                </div>
                <div className='toggle_div'>
                    <div className='toggle_div1'>
                    </div>
                </div>
            </div>
            <div className='side_tabs'>
                <div className='single_tab'>
                    <FiHome/>
                    <h4>Dashboard</h4>
                </div>
            </div>
        </div>
        <div className='dash_right'>
        
        </div>
    </div>
  )
}

export default dashboard    