import './App.css';
import Header from './Header';
import Card from './Card';

import SideBar from './SideBar'
import Home from './Home';
import { useState } from 'react';
function App() {
  const [openSidebarToggle, setOpenSidebarToggele]= useState(false)

  const OpenSidebar = () =>{
    setOpenSidebarToggele(!openSidebarToggle)
  }
  return (
    <div className='grid-container'>
        <Header OpenSidebar={OpenSidebar}/>
        <SideBar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
        <Home/>
    </div>
  );
}

export default App;
