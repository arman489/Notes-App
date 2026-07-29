import React, { useEffect, useState } from 'react'
import { useMyContext } from '../config/Context'
import { Navigate, Outlet } from 'react-router-dom'
import Loading from '../component/Loading'

function Protect() {
  const { isAuth,loading } = useMyContext()
  
  if (loading) {
    return <Loading/>;
  }

  if (!isAuth) {
    return <Navigate to={'/login'} replace />
  }
  return <Outlet />
}

export default Protect