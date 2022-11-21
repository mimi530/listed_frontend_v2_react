import React, { useState } from 'react'
import { Input } from '../components/Input';
import { FaLock } from "react-icons/fa";
import i18n from '../i18n';
import logo from '../assets/img/logo.png'
import { routes } from '../routes';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeSelector } from '../components/ThemeSelector';
import { LanguageSelector } from '../components/LanguageSelector';
import { api } from '../api';
import { toast } from 'react-toastify';
import { GuestBackground } from '../components/Layout/GuestBackground';

export const RegisterPage = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
      e.preventDefault();
      const data = {name, email, password, password_confirmation};
      api.post('auth/register', data).then(
          response => {
              if(response.status === 201) {
                  toast.success(response.data.message)
                  return navigate(routes.login)
              }
          }
      ).catch(error => {
          toast.error(error.response.data.message)
      })
  }

  return (
    <GuestBackground>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img className="mx-auto h-24 w-auto" src={logo} alt="Your Company"/>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-accent dark:text-white">{i18n.t('Create a new account')}</h2>
            <p className="mt-2 text-center text-sm text-gray-600 dark:text-white">
              {i18n.t('Or')}&nbsp;
              <a href="#" className="font-medium text-primary hover:text-primary">
                <Link to={routes.login}>{i18n.t('sign in to an existing account')}</Link>
              </a>
            </p>
          </div>
          <div className="bg-white dark:bg-secondary px-8 py-3 pb-10 rounded-lg shadow-md">
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="-space-y-px rounded-md shadow-sm">
                <div>
                  <Input name="name" value={name} onChange={e => setName(e.target.value)} type="text" placeholder="Your name" autoComplete="name" required/>
                </div>
                <div>
                  <Input name="email-address" value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email address" autoComplete="email" required/>
                </div>
                <div>
                  <Input name="password" value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" autoComplete="new-password" required/>
                </div>
                <div>
                  <Input name="password-confirmation" value={password_confirmation} onChange={e => setPasswordConfirmation(e.target.value)} type="password" placeholder="Password confirmation" autoComplete="current-password"  required/>
                </div>
              </div>
              <div>
                <button type="submit" className="group relative flex w-full justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <FaLock/>
                    </span>
                    {i18n.t('Sign up')}
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
    </GuestBackground>
  )
}
