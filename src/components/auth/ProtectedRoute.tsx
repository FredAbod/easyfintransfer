
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  // We don't need the children prop anymore as we'll use Outlet
}

// Use Outlet from react-router-dom instead of directly rendering children
const ProtectedRoute: React.FC<ProtectedRouteProps> = () => {
  const { user } = useAuth();

  // If not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;
