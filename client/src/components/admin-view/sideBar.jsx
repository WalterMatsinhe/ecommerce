import React, { Fragment } from 'react';
import { ChartNoAxesCombined } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Sheet, SheetHeader, SheetTitle, SheetContent} from '../ui/sheet';
import { LayoutDashboard, ShoppingBasket, BadgeCheck } from 'lucide-react';

export const adminSideBarMenuItems = [
  {
    id: 'dashBoard',
    label: 'Dashboard',
    path: '/admin/dashboard',
    icon: React.createElement(LayoutDashboard),
  },
  {
    id: 'products',
    label: 'Products',
    path: '/admin/products',
    icon: React.createElement(ShoppingBasket)
  },
  {
    id: 'orders',
    label: 'Orders',
    path: '/admin/orders',
    icon: React.createElement(BadgeCheck)
  }
];

function MenuItems({setOpen}) {
  const navigate = useNavigate();

  return (
    <nav className="mt-8 flex flex-col gap-2">
      {adminSideBarMenuItems.map((menuItem) => (
        <div
          key={menuItem.id}
          onClick = {() => {
            navigate(menuItem.path);
            if (setOpen) setOpen(false);
          }}
          className="flex cursor-pointer text-xl items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:text-neon hover:scale-115 duration-200 "
        >
          {menuItem.icon}
          <span>{menuItem.label}</span>
        </div>
      ))}
    </nav>
  );
}

function AdminSideBar({open,setOpen}) {
  const navigate = useNavigate();

  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side = 'left' className = 'w-64 bg-black/93 backdrop-blur-md'>
          <div className = 'flex flex-col h-full'>
            <SheetHeader className='border-b '>
              <SheetTitle className='flex gap-2 ml-3'>
                <ChartNoAxesCombined size= {30}/>
                <span className='font-extrabold text-xl flex items-center justify-center gap-4'>Admin Panel</span> 
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen}/>
          </div>
        </SheetContent>

      </Sheet>
      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div
          onClick={() => navigate('/admin/dashboard')}
          className="flex cursor-pointer items-center gap-2"
        >
          <ChartNoAxesCombined size={30} />
          <h1 className="text-2xl font-extrabold">Admin Panel</h1>
        </div>
        <div>
          <MenuItems/>
        </div>
      </aside>
    </Fragment>
  );
}

export default AdminSideBar;