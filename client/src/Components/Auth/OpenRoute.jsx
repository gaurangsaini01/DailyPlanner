import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function OpenRoute({children}) {
    const token = useSelector(state => state.token)
    if(token !== null){
        return <Navigate to='/dashboard'></Navigate>
    }
    else return children;
}

export default OpenRoute