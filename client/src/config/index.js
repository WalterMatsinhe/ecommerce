import React from 'react';
import { LayoutDashboard, ShoppingBasket, BadgeCheck } from 'lucide-react';

export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

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
