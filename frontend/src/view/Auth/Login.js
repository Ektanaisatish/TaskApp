import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../redux/actions/Actions';
import toast from 'react-hot-toast';

function Login() {
  const navigate = useNavigate();
  const [loginsuccess, setIsLoginsuccess] = useState("false");
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors: formErrors } } = useForm();

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      console.log(token,"tokan")
      console.log('setLoggedIn the user',setIsLoginsuccess)
      navigate('/dashboard');
    }
  }, [navigate]);

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      const response = await dispatch(login(email, password));
      console.log('Login response:', response);
      
      if (response.token) {
        setIsLoginsuccess("true",true);
        navigate('/dashboard');
        console.log(loginsuccess,"user logged");
        toast.success('Login successful');
         localStorage.setItem("userId", response.user._id);
         localStorage.setItem("taskId", response.user.task_id); 
      } else {
        toast.error('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred during login.');
    }
  };

  return (
    <div className="form">
      <h1>Login</h1>
      <div className="container">
        <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              className="form-control form-control-lg"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: 'Invalid email format',
                },
              })}
            />
            <p>{formErrors.email?.message}</p>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="form-control form-control-lg"
              id="exampleInputPassword1"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 4,
                  message: 'Minimum password length is 4 characters',
                },
              })}
            />
            <p>{formErrors.password?.message}</p>
          </div>
          <button type="submit" className="btn btn-primary mb-3">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Login;