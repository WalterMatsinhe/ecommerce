import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSideBar from './sideBar';
import AdminHeader from './header';

function Adminlayout() {
  const [openSideBar, setOpenSideBar] = useState(false);

  return (
    <div className="flex min-h-screen w-full">
      <AdminSideBar open={openSideBar} setOpen={setOpenSideBar} />

      {/* Apply blur here when sidebar is open */}
      <div className={`flex flex-col flex-1 transition-all duration-300 ${openSideBar ? 'blur-xs' : ''}`}>
        <AdminHeader setOpen={setOpenSideBar} />
        <main className="flex-1 bg-muted/40 p-4 md:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Adminlayout;
