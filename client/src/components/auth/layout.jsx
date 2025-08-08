import React from "react";
import { Outlet } from "react-router-dom";

function Authlayout() {
  return (
    <div className="relative flex items-center justify-center min-h-screen w-full overflow-hidden bg-black">
      {/* Background Image Layer */}
      <div className=" absolute inset-0 bg-black/99 bg-[url('/Images/SalesBackground.jpg')] bg-cover bg-center bg-no-repeat bg-fixed filter blur-md " />

      {/* Foreground Content */}
      <div className="relative z-10 px-5 py-5 w-full max-w-md">
        <div className="bg-white/85  rounded-3xl p-10 mt-5 shadow-2xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Authlayout;
