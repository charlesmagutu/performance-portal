import React from "react";
import { BsCart3, BsTv,BsGrid1X2Fill,BsFillAlarmFill,BsServer, BsFillCloudFill, BsClipboardData, BsPeopleFill, BsListCheck, BsMenuButtonFill, BsFillGearFill } from "react-icons/bs";

const SideBar= ({openSidebarToggle, OpenSidebar})=>{

    return(
        <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive":""}>
            <div className="sidebar-titile">
                <div className="sidebar-brand">
                    <h2 className="icon_header">Quality Assurance</h2>
                </div>
            </div>
            <ul className="sidebar-list">
                <li className="sidebar-list-item">
                <a href="">
                    <BsGrid1X2Fill className='icon'/> Dashboard
                </a>
                </li>
                <li className="sidebar-list-item">
                    <a href="">
                        <BsTv className="icon"/> Systems
                    </a>
                </li>
                <li className="sidebar-list-item"> 
                    <a href="">
                    <BsFillCloudFill className="icon"/> Envronments
                    </a>
                </li>
                <li className="sidebar-list-item">
                    <a href="">
                        <BsFillGearFill className="icon"/> Configurations
                    </a>
                </li>
                <li className="sidebar-list-item">
                    <a href="">
                        <BsFillAlarmFill className="icon"/> Scheduler
                    </a>
                </li>
                <li className="sidebar-list-item">
                    <a href="">
                        <BsServer className="icon"/> Servers
                    </a>
                </li>
                <li className="sidebar-list-item">
                    <a href="">
                        <BsClipboardData className="icon"/> Reports
                    </a>
                </li>
            </ul>
        </aside>
    )
}

export default SideBar