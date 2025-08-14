import React from "react";
import { Outlet } from "react-router-dom";
import { HousePlug } from "lucide-react";
import { BorderBeam } from "@/components/magicui/border-beam";

function Authlayout() {
  return (
    <div className="relative flex items-center justify-center min-h-screen w-full overflow-hidden bg-black">
      {/* Background Image Layer */}
      <div className="absolute inset-0 bg-[url('/Images/white.png')]  bg-[length:1550px_750px] bg-center bg-no-repeat bg-fixed filter blur-sm" />
      
      {/* Logo top-left */}
      <div className="absolute top-14  left-10  flex items-center gap-1 z-20 bg-primary border-5 rounded-md  border-black shadow-md shadow-primary">
        <div className='bg-black py-1'><HousePlug className="h-8 w-8 text-white  stroke-3" /></div>
         <span className='text-white text-glow text-2xl font-extrabold mr-1 mb-1 ml-1'>Ecommerce</span>
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 px-1 py-2 w-full max-w-md">
        <div className="bg-white/80 shadow-black rounded-3xl p-10  shadow-2xl gap-3">
          <Outlet />
          <BorderBeam duration={6} size={500}  className= 'from-transparent via-primary to-primary' borderWidth={9}/>
        </div>
      </div>
    </div>
  );
}

export default Authlayout;
