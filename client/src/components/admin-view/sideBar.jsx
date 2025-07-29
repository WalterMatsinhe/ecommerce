import React, { Fragment } from 'react';
import { ChartNoAxesCombined } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { adminSideBarMenuItems } from '@/config';

function MenuItems() {
  const navigate = useNavigate();

  return (
    <nav className="mt-8 flex flex-col gap-2">
      {adminSideBarMenuItems.map((menuItem) => (
        <div
          key={menuItem.id}
          onClick={() => navigate(menuItem.path)}
          className="flex items-center gap-2 rounded-md px-3 py-2 cursor-pointer"
        >
          {menuItem.icon}
          <span>{menuItem.label}</span>
        </div>
      ))}
    </nav>
  );
}

function AdminSideBar() {
  const navigate = useNavigate();

  return (
    <Fragment>
      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div
          onClick={() => navigate('/admin/dashboard')}
          className="flex cursor-pointer items-center gap-2"
        >
          <ChartNoAxesCombined size={30} />
          <h1 className="text-xl font-extrabold">Admin Panel</h1>
        </div>

        <MenuItems />
      </aside>
    </Fragment>
  );
}

export default AdminSideBar;