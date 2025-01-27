import React, { useState } from 'react'
import { Logo, Ovals, calender, chart, dashboard, filter, map, profile, upload, exit } from '../../assets/index.js'
import { CiSun } from "react-icons/ci"
import { IoMoonOutline } from "react-icons/io5";
import { toast } from 'react-toastify';
function Sidebar({ open, setOpen }) {
    function openSidebar() {
        setOpen((prev) => !prev)
    }
    const [theme, setTheme] = useState("light");
    function handleThemeChange(e) {
        console.log(e.target.textContent)
        if (e.target.textContent === "Dark") {
            document.body.classList.add("dark");
            toast.success('Dark theme ON', {
                autoClose: 1000,
                theme: "dark"
            })
            setTheme("dark");
        }
        else {
            document.body.classList.remove("dark");
            toast.success('Light theme ON', {
                autoClose: 1000,
                theme: "light",
            })
            setTheme("light");
        }
    }
    return (
        <div className='min-h-screen bg-[#222327] flex flex-row'>
            <div className='flex flex-col justify-between items-center'>
                <div className='flex gap-10 lg:w-[90px] w-[70px] flex-col items-center pt-8'>
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
            {open && <div className='w-[300px] h-full text-white'>
                <div className=''></div>
                <div>
                    <div className='bg-[#2b2c30] rounded-full flex justify-evenly w-fit px-2 py-1 mx-auto mt-6'>
                        <div onClick={handleThemeChange} className={`cursor-pointer hover:scale-95 transition-all ease-in-out duration-150 flex items-center w-1/2 rounded-full px-5 ${theme === "light" ? "bg-[#38393d]" : ""} `}>
                            <CiSun size={20} />
                            <p>Light</p>
                        </div>
                        <div onClick={handleThemeChange} className={`cursor-pointer hover:scale-95 transition-all ease-in-out duration-150 flex items-center w-1/2 rounded-full px-5 ${theme === "dark" ? "bg-[#38393d]" : ""}`}>
                            <IoMoonOutline />
                            <p>Dark</p>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default Sidebar