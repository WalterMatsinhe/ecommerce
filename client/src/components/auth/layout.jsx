import React from "react";
import { Outlet } from "react-router-dom";
import { MorphingText } from "@/components/magicui/morphing-text";

function AuthLayout() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center">
      {/* Left Side (Image + Welcome text) */}
      <div className="hidden lg:flex flex-col items-left justify-center bg-black w-1/2">
        <div className=" max-w-md space-y-6 ml-19">
          <MorphingText className='text-9xl text-neon font-bold' texts={["Welcome", "to" ,"Ecommerce","Shopping"]} />
        </div>
      </div>

      {/* Right Side (Auth forms) */}
      <div className="relative flex flex-1 items-center justify-center  py-16 sm:px-6 lg:px-8 mb-2 ml-2 mr-11 rounded-3xl shadow-md">
        <div className="rounded-3xl shadow-primary relative flex flex-1 items-center justify-center bg-primary-foreground border-neon  py-16 sm:px-6 lg:px-8 mb-2 ml-2 mr- mb-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
