import React from 'react';

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

export const addProductFormElements = [
  {
    label: 'Title',
    name: 'title',
    type: 'text',
    placeholder: 'Enter product title',
    componentType: 'input',
  },
  {
    label: 'Description',
    name: 'description',
    type: 'text',
    placeholder: 'Enter product description',
    componentType: 'textarea',
  },
  {
    label: 'Category',
    name: 'category',
    componentType: 'select',
    options: [
      { id: 'men', label: 'Men' },
      { id: 'women', label: 'Women' },
      { id: 'kids', label: 'Kids' },
      { id: 'accessories', label: 'Accessories' },
      { id: 'footwear', label: 'Footwear' },
    ],
  },
  {
    label: 'Brand',
    name: 'brand',
    componentType: 'select',
    options: [
      { id: 'nike', label: 'Nike' },
      { id: 'adidas', label: 'Adidas' },
      { id: 'puma', label: 'Puma' },
      { id: 'levis', label: 'Levis' },
      { id: 'lacoste', label: 'Lacoste' },
      { id: 'zara', label: 'Zara' },
    ],
  },
  {
    label: 'Price',
    name: 'price',
    componentType: 'input',
    type: 'number',
    placeholder: 'Enter product price',
  },
  {
    label: 'Sale Price',
    name: 'salePrice',
    componentType: 'input',
    type: 'number',
    placeholder: 'Enter sale price (optional)',
  },
  {
    label: 'Total Stock',
    name: 'totalStock',
    componentType: 'input',
    type: 'number',
    placeholder: 'Enter total stock',
  },
];

export const sortOptions= {
  category : [
    {id: 'price-lowtoHigh', label:'Price: Low to High'},
    {id: 'price-HightoLow', label:'Price: High to Low'},
    {id: 'title-atoz', label:'Title: A to Z'},
    {id: 'title-ztoa', label:'Price: Z to A'},
  ]
}

export const shoppingViewHeaderMenuItems= [
  {
    id : 'home',
    label : 'Home',
    path : '/shop/home'
  },
  {
    id : 'men',
    label : 'Men',
    path : '/shop/listing'
  },
  {
    id : 'woman',
    label : 'Woman',
    path : '/shop/listing'
  },
   
   {
    id : 'kids',
    label : 'Kids',
    path : '/shop/listing'
  },
  {
    id : 'footwear',
    label : 'Footwear',
    path : '/shop/listing'
  },
  {
    id : 'accessories',
    label : 'Acessories',
    path : '/shop/listing'
  },
];

export const filterOptions= {
  category : [
    {id: 'men', label:'Men'},
    {id: 'women', label:'Women'},
    {id: 'kids', label:'Kids'},
    {id: 'accessories', label:'Accessories'},
    {id: 'footwear', label:'Footwear'},
  ],
  brand : [
    {id: 'men', label:'Men'},
    {id: 'women', label:'Women'},
    {id: 'kids', label:'Kids'},
    {id: 'accessories', label:'Accessories'},
    {id: 'footwear', label:'Footwear'},
  ],

}