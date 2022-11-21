import React, { useContext, useEffect } from 'react'
import { Navigate, redirect, Redirect, Route } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { routes } from '../routes';

function ProtectedRoute({children}) {
  const authContext = useContext(AuthContext);

  if (!authContext.isAuth) {
    return <Navigate to={routes.login} replace />;
  }
  return children;

}
export default ProtectedRoute
