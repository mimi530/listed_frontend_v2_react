import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { api } from '../api'
import { AuthContext } from '../context/AuthContext'
import { routes } from '../routes'
import {FaSignOutAlt} from 'react-icons/fa'
import i18n from '../i18n'


export const Logout = () => {

  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    api.post('auth/logout').then(
      response => {
        toast.success(response.data.message)
        authContext.setIsAuth(false);
        authContext.setUsername('');
        return navigate(routes.login);
      }
    ).catch(
      error => {
        toast.error(error.response.data.message)
      }
    )
  } 

  return (
    <Link to={routes.login} onClick={handleLogout} className="flex font-medium gap-2 text-primary">
      { i18n.t('Logout') } <FaSignOutAlt className="text-2xl"/>
    </Link>
  )
}
