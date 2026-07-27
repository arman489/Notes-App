import React, { useEffect, useState } from 'react'
import { useMyContext } from '../config/Context'
import { Navigate, Outlet } from 'react-router-dom'

function Protect() {
  const { isAuth,loading } = useMyContext()
  
  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!isAuth) {
    return <Navigate to={'/login'} replace />
  }
  return <Outlet />
}

export default Protect