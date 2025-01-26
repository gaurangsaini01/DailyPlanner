import React from 'react'
import Sidebar from '../Components/Dashboard/Sidebar'
import Main from '../Components/Dashboard/Main'

function Dashboard() {
    return (
        <div className='flex flex-row w-full'>
            <div><Sidebar /></div>
            <div className='w-full'><Main /></div>
        </div>
    )
}

export default Dashboard