import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Commonform from '@/components/common/form';
import { loginFormControls } from '@/config';
import { useDispatch } from "react-redux";
import { loginUser } from '@/store/auth-slice';
import { toast } from 'sonner';

const initialState = {
  email: '',
  password: '',
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();

    dispatch(loginUser(formData)).then((data) => {
      const payload = data?.payload;

      if (payload?.success) {
        toast.success(payload.message);

        if (payload.user.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/shop/home');
        }
      } else {
        toast.error(payload.message);
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p className="mt-2">
          Don't have an account?
          <Link className="font-medium text-primary ml-2 hover:underline" to="/auth/register">
            Register
          </Link>
        </p>
      </div>

      <Commonform
        formControls={loginFormControls}
        buttonText="Sign In"
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthLogin;