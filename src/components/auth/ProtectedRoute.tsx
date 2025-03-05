import React from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

// No more authentication checks - just render the children directly
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  return <>{children}</>;
};

export default ProtectedRoute;
