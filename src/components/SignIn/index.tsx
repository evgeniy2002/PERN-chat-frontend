import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { LoginPreview } from '../../types';
import instance from '../../axios';
import { setUserData } from '../../redux/auth/slice';
import { useAppDispatch } from '../../redux/hooks';

export const SignIn: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<LoginPreview>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (params: LoginPreview) => {
    try {
      const { data } = await instance.post('/auth/signin', params);
      console.log(data);
      dispatch(setUserData(data));

      if ('token' in data) {
        window.localStorage.setItem('token', data.token);
      }
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="register-header">
          <p>Sign In</p>
        </div>

        <div className="register-form__field">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="Outline"
            viewBox="0 0 24 24"
            width="20"
            height="20">
            <path d="M19,1H5A5.006,5.006,0,0,0,0,6V18a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V6A5.006,5.006,0,0,0,19,1ZM5,3H19a3,3,0,0,1,2.78,1.887l-7.658,7.659a3.007,3.007,0,0,1-4.244,0L2.22,4.887A3,3,0,0,1,5,3ZM19,21H5a3,3,0,0,1-3-3V7.5L8.464,13.96a5.007,5.007,0,0,0,7.072,0L22,7.5V18A3,3,0,0,1,19,21Z" />
          </svg>

          <input
            {...register('email', { required: 'Укажите email' })}
            type="email"
            placeholder="Email"
          />
          <span>{errors.email?.message}</span>
        </div>
        <div className="register-form__field">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="Layer_1"
            data-name="Layer 1"
            viewBox="0 0 24 24"
            width="20"
            height="20">
            <path d="M7.505,24A7.5,7.5,0,0,1,5.469,9.283,7.368,7.368,0,0,1,9.35,9.235l7.908-7.906A4.5,4.5,0,0,1,20.464,0h0A3.539,3.539,0,0,1,24,3.536a4.508,4.508,0,0,1-1.328,3.207L22,7.415A2.014,2.014,0,0,1,20.586,8H19V9a2,2,0,0,1-2,2H16v1.586A1.986,1.986,0,0,1,15.414,14l-.65.65a7.334,7.334,0,0,1-.047,3.88,7.529,7.529,0,0,1-6.428,5.429A7.654,7.654,0,0,1,7.505,24Zm0-13a5.5,5.5,0,1,0,5.289,6.99,5.4,5.4,0,0,0-.1-3.3,1,1,0,0,1,.238-1.035L14,12.586V11a2,2,0,0,1,2-2h1V8a2,2,0,0,1,2-2h1.586l.672-.672A2.519,2.519,0,0,0,22,3.536,1.537,1.537,0,0,0,20.465,2a2.52,2.52,0,0,0-1.793.743l-8.331,8.33a1,1,0,0,1-1.036.237A5.462,5.462,0,0,0,7.5,11ZM5,18a1,1,0,1,0,1-1A1,1,0,0,0,5,18Z" />
          </svg>

          <input
            {...register('password', { required: 'Укажите пароль' })}
            type="password"
            placeholder="Password"
          />
          <span>{errors.password?.message}</span>
        </div>

        <button type="submit" disabled={!isValid} className="register-form__btn">
          Sign In
        </button>

        <div className="register-navigation__button">
          {/* <Link to="/auth/login"> */}
          <span>
            Dont have an account? <Link to="/auth/register">Signup</Link>
          </span>
          {/* </Link> */}
        </div>
      </form>
    </div>
  );
};
