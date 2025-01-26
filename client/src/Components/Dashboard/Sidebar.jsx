import React, { useState } from 'react'
import { Logo, Ovals, calender, chart, dashboard, filter, map, profile, upload, exit } from '../../assets/index.js'
function Sidebar() {
    const [open, setOpen] = useState(false);
    function openSidebar() {
        setOpen((prev) => !prev)
    }
    return (
        <div className='h-screen bg-black flex flex-row'>
            <div className='flex flex-col justify-between items-center'>
                <div className='flex gap-10 w-[90px] flex-col items-center pt-8'>
                    <img src={Ovals} className='20px' alt="" />
                    <img src={Logo} onClick={openSidebar} className='cursor-pointer' alt="" />
                    <img src={dashboard} alt="" />
                    <img src={profile} alt="" />
                    <img src={calender} alt="" />
                    <img src={chart} alt="" />
                    <img src={upload} alt="" />
                    <img src={filter} alt="" />
                </div>
                <div className='pb-4'><img src={exit} alt="" /></div>
            </div>
            {open && <div className='w-[300px]'></div>}
        </div>
    )
}

export default Sidebar