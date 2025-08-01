import React from 'react'
import { Outlet } from 'react-router-dom';


function Authlayout () {
  return (
    <div className='bg-black'>
      <div className = 'flex min-h-screen w-full  border-neutral-800 backdrop-blur-xl' >
        <div style={{
              backgroundImage: "url(/Images/sale.bg.png)"
              
            }} className = 'hidden lg:flex items-center justify-center  w-243 bg-cover bg-center bg-no-repeat mt-4'>
        <div  className = 'max-w-md space-y-6 text-center text-white'>
        </div>
        </div>
        <div className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md bg-white border-2 rounded-4xl p-15 shadow-md">
          <Outlet />
        </div>
       </div>

    </div>
    </div>
  )
}

export default Authlayout;
