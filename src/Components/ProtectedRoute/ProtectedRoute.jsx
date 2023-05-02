import React, { useEffect } from 'react';
// import styles from './ProtectedRoute.module.css';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {

  const uToken = localStorage.getItem('uToken');

  useEffect(() => {
    if (!uToken) {
      navigateToLogin();
    }
  }, [uToken]);

  const navigateToLogin = () => {
    return <Navigate to={'/login'} />;
  };

  return uToken ? children : navigateToLogin();
}