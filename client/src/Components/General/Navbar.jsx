import React, { useState } from 'react'
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { IoCalendarClearOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { setToken, setUser } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
function Navbar() {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    function handleLogout() {
        dispatch(setToken(null));
        dispatch(setUser(null));
        navigate('/');
    }
    return (
        <div className='flex items-center bg-white dark:bg-amber-200 justify-between lg:px-6 lg:py-4 px-2 py-2'>
            <div className='lg:text-xl text-md font-semibold'>Welcome back, <span className='capitalize'>{user?.username}</span> 👋</div>
            <div className='flex items-center gap-6'>
                <div className='lg:flex hidden items-center  text-xl gap-6'>
                    <IoIosSearch />
                    <IoMdNotificationsOutline />
                    <div className='flex items-center gap-2'><IoCalendarClearOutline /> <span className='text-sm font-medium opacity-60'>26 Jan 2025</span></div>
                </div>
                <div className='relative rounded-full w-10'>
                    <img onClick={() => setShowMenu(prev => !prev)} src={user?.profile} className='w-full h-full rounded-full' alt="dp" />
                    {showMenu && <div className='absolute top-12 right-0 p-2 w-[80px] h-[40px]  opacity-100 bg-[#2e2e2e] text-[#f0f0f0] rounded-sm'>
                        <button onClick={() => handleLogout()}>Logout</button>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default Navbar