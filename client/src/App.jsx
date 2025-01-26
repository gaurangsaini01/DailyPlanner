import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AuthTemplate from './Pages/AuthTemplate'
import Dashboard from './Pages/Dashboard'
import PrivateRoute from './Components/Auth/PrivateRoute.jsx';
import OpenRoute from './Components/Auth/OpenRoute.jsx';

function App() {
  return (
    <Routes>
      <Route path='/' element={<OpenRoute><AuthTemplate type={"login"} /></OpenRoute>}></Route>
      <Route path='/signup' element={<OpenRoute><AuthTemplate type={"signup"} /></OpenRoute>}></Route>
      <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>}></Route>
    </Routes>
  )
}

export default App