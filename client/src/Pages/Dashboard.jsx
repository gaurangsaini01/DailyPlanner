import React, { useState } from 'react'
import Sidebar from '../Components/Dashboard/Sidebar'
import Main from '../Components/Dashboard/Main'

function Dashboard() {
    const [open, setOpen] = useState(false);
    return (
        <div className='flex flex-row w-full overflow-hidden'>
            <div className='fixed'><Sidebar open={open} setOpen={setOpen} /></div>
            <div className={`w-full ${open ? 'lg:ml-[390px]' : "lg:ml-[90px] ml-[80px]"}`}><Main /></div>
        </div>
    )
}

export default Dashboard