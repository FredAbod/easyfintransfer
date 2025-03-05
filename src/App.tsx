
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginForm from "./components/auth/LoginForm";
import SignupForm from "./components/auth/SignupForm";
import PhoneNumberForm from "./components/auth/PhoneNumberForm";
import UsernameForm from "./components/auth/UsernameForm";
import Dashboard from "./components/dashboard/Dashboard";
import TransferForm from "./components/transfers/TransferForm";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<div className="min-h-screen bg-slate-50 flex items-center justify-center p-4"><LoginForm /></div>} />
            <Route path="/signup" element={<div className="min-h-screen bg-slate-50 flex items-center justify-center p-4"><SignupForm /></div>} />
            <Route path="/add-phone/:userId" element={<div className="min-h-screen bg-slate-50 flex items-center justify-center p-4"><PhoneNumberForm /></div>} />
            <Route path="/add-username/:userId" element={<div className="min-h-screen bg-slate-50 flex items-center justify-center p-4"><UsernameForm /></div>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/transfer" element={<ProtectedRoute><TransferForm /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
