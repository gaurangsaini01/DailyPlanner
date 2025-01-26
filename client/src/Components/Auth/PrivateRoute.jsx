import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
    const token = useSelector(state => state.token);

    if (token != null) {
        return children;
    }
    else {
        return <Navigate to='/'></Navigate>
    }

}

export default PrivateRoute