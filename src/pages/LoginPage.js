import React, { useContext, useState } from 'react'
import { Input } from '../components/Input';
import { FaLock } from "react-icons/fa";
import i18n from '../i18n';
import logo from '../assets/img/logo.png'
import { Link, Navigate, redirect, useNavigate } from 'react-router-dom';
import { routes } from '../routes';
import { ThemeSelector } from '../components/ThemeSelector';
import { LanguageSelector } from '../components/LanguageSelector';
import { AuthContext } from '../context/AuthContext';
import { api } from '../api';
import { toast } from 'react-toastify';
import { Footer } from '../components/Layout/Footer';
import { GuestBackground } from '../components/Layout/GuestBackground';

export const LoginPage = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email, password };
    setIsPending(true);
    await api
      .post("auth/login", data)
      .then((response) => {
        if (response.status === 200) {
          authContext.setIsAuth(true);
          authContext.setUsername(response.data.user.name);
          // toast.success(response.data.message);
          navigate(routes.lists);
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setIsPending(false);
      });
  };

  return (
    <GuestBackground>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img className="mx-auto h-24 w-auto" src={logo} alt="Your Company"/>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-accent dark:text-white">{i18n.t('Sign in to your account')}</h2>
            <p className="mt-2 text-center text-sm text-gray-600 dark:text-white">
              {i18n.t('Or')}&nbsp;
              <a className="font-medium text-primary hover:text-primary"> 
                <Link to={routes.register}>{i18n.t('create a new account')}</Link>
              </a>
            </p>
          </div>
          <div className="bg-white px-8 py-3 pb-10 rounded-lg shadow-md dark:bg-secondary">
            <form className="mt-8 space-y-6 dark:" onSubmit={handleSubmit}>
              <div className="-space-y-px rounded-md shadow-sm">
                <div>
                  <Input name="email-address" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email address" autoComplete="email" required/>
                </div>
                <div>
                  <Input name="password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" autoComplete="current-password" required/>
                </div>
              </div>
              <div>
                <button type="submit" className="group relative flex w-full justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <FaLock/>
                    </span>
                    {i18n.t('Sign in')}
                </button>
              </div>
              <div className="flex flex-col gap-5 justify-center items-center">
              <ThemeSelector/>
              <LanguageSelector/>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer/>
    </GuestBackground>
  )
}
