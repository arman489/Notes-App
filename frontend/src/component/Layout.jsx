import React from 'react'

function Layout({children}) {
  return (
    <div className='w-7xl  m-auto bg-amber-600 flex justify-center items-center ' >
    {children}
    </div>
  )
}

export default Layout