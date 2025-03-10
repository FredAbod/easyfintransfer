
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import Signup from '@/pages/Signup';
import Signin from '@/pages/Signin';
import Profile from '@/pages/Profile';
import Home from '@/pages/Index';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Dashboard from '@/components/dashboard/Dashboard';
import TransferForm from '@/components/transfers/TransferForm';
import Deposit from '@/pages/Deposit';
import Withdraw from '@/pages/Withdraw';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          
          {/* Protected routes - using Route's nesting capability */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/transfer" element={<TransferForm />} />
            <Route path="/deposit" element={<Deposit />} />
            <Route path="/withdraw" element={<Withdraw />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
