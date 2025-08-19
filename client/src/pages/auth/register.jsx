import React, { useState } from 'react';
import Commonform from '@/components/common/form';
import { registerFormControls } from '@/config';
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "@/store/auth-slice";
import { toast } from 'sonner';

const initialState = {
  userName: '',
  email: '',
  password: '',
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onSubmit(event) {
    event.preventDefault();

    dispatch(registerUser(formData)).then((resultAction) => {
      const data = resultAction.payload;
      console.log('Register response:', data);

      if (data?.success) {
        toast.success('Registration successful! Please log in.');
        navigate('/auth/login');
      } else {
        toast.error(data?.message || 'Registration failed. Try again.');
      }
    }).catch(() => {
      toast.error('Something went wrong.');
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Create new account</h1>
        <p className="mt-2">
          Already have an account?
          <Link className="font-medium text-neon ml-2 hover:underline" to="/auth/login">
            Login
          </Link>
        </p>
      </div>

      <Commonform
        formControls={registerFormControls}
        buttonText="Sign Up"
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthRegister;
