import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Style.scss'
function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/user/signup', formData);
      const data = response.data;
      // Here you can dispatch an action or handle the success response as needed
      console.log('Signup successful:', data);
      // Redirect to login page after successful signup
      navigate('/login');
    } catch (error) {
      console.error('Signup error:', error.response.data.message);
      // Handle signup error here, show error message to the user
    }
  };

  return (
    <div>
      <div className="form">
        <h1>Signup</h1>
        <div className="container">
          <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="exampleInputName" className="form-label">
                Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="name"
                className="form-control form-control-lg"
                id="exampleInputName"
                {...register('name', { required: 'Name is required' })}
              />
              <p>{formErrors.name?.message}</p>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
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
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="form-control form-control-lg"
                id="exampleInputPassword1"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 4,
                    message: 'Password must be at least 4 characters long',
                  },
                })}
              />
              <p>{formErrors.password?.message}</p>
            </div>
            <button type="submit" className="btn btn-primary mb-3">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
