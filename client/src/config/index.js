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
      { id: 'ellesse', label: 'Ellesse' },
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
    id : 'women',
    label : 'Women',
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
    label : 'Accessories',
    path : '/shop/listing'
  },
];
export const categoryOptionsMap = {
  'men' : 'Men',
  'women' : 'Women',
  'kids' : 'Kids',
  'accessories' : 'Accessories',
  'footwear' : 'Footwear',
}


export const brandOptionsMap = {
  'nike' : 'Nike',
  'adidas' : 'Adidas',
  'puma' : 'Puma',
  'levis' : 'Levis',
  'lacoste' : 'Lacoste',
  'zara' : 'Zara',
}

export const filterOptions= {
  category : [
    {id: 'men', label:'Men'},
    {id: 'women', label:'Women'},
    {id: 'kids', label:'Kids'},
    {id: 'accessories', label:'Accessories'},
    {id: 'footwear', label:'Footwear'},
  ],
  brand : [
    {id: 'nike', label:'Nike'},
    {id: 'adidas', label:'Adidas'},
    {id: 'puma', label:'Puma'},
    {id: 'levi', label:'Levi'},
    {id: 'zara', label:'Zara'},
    {id: 'Lacoste', label:'Lacoste'},
  ],
}
export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];


