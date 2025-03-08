
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Send, User, Bell, Menu, X, LogOut, Settings, CreditCard, PiggyBank, BarChart3 } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  
  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: Send, label: 'Transfer', path: '/transfer' },
    { icon: CreditCard, label: 'Deposit', path: '/deposit' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];
  
  const isActive = (path: string) => location.pathname === path;
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  // Display initials for avatar
  const getInitials = () => {
    if (user?.userName) {
      return user.userName.charAt(0).toUpperCase();
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return 'U';
  };
  
  return (
    <>
      {/* Mobile top bar */}
      <header className="fixed top-0 inset-x-0 h-16 flex items-center justify-between bg-white shadow-sm z-50 px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
          <h1 className="text-xl font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">EasyFinTransfer</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-primary rounded-full"></span>
            <span className="sr-only">Notifications</span>
          </Button>
          <Avatar className="h-9 w-9 border-2 border-slate-100">
            <AvatarImage src={user?.profilePicture || ""} alt="Profile" />
            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm">{getInitials()}</AvatarFallback>
          </Avatar>
        </div>
      </header>
      
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={toggleMenu}>
          <div className="bg-white h-full w-64 p-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-medium text-lg">Menu</h2>
              <Button variant="ghost" size="icon" onClick={toggleMenu}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link
                  to={item.path}
                  key={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-primary text-white'
                      : 'hover:bg-slate-100'
                  }`}
                  onClick={toggleMenu}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              ))}
              
              <button
                className="flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-colors hover:bg-slate-100 text-left"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5 text-red-500" />
                <span className="text-red-500">Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Mobile bottom bar */}
      <nav className="fixed bottom-0 inset-x-0 bg-white shadow-[0_-1px_3px_rgba(0,0,0,0.1)] z-50 md:hidden">
        <div className="flex items-center justify-around h-16 px-4">
          {navItems.map((item) => (
            <button
              key={item.path}
              className={`flex flex-col items-center justify-center gap-1 p-2 rounded-lg transition-colors ${
                isActive(item.path) ? 'text-primary' : 'text-slate-600'
              }`}
              onClick={() => navigate(item.path)}
            >
              <item.icon className={`h-5 w-5 ${isActive(item.path) ? 'animate-pulse-subtle' : ''}`} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
      
      {/* Desktop sidebar - visible on md+ screens */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-white shadow-md z-50 hidden md:flex md:flex-col">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-2xl font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">EasyFinTransfer</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.path}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-colors ${
                isActive(item.path)
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                  : 'hover:bg-slate-100'
              }`}
              onClick={() => navigate(item.path)}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
        
        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 mb-4 p-3">
            <Avatar className="h-10 w-10 border-2 border-slate-100">
              <AvatarImage src={user?.profilePicture || ""} alt="Profile" />
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">{getInitials()}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{user?.userName || user?.email?.split('@')[0] || 'User'}</p>
              <p className="text-xs text-slate-500 truncate">{user?.email || ''}</p>
            </div>
          </div>
          
          <button
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-colors hover:bg-red-50 text-red-500"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default NavBar;
