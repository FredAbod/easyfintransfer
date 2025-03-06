import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Send, User, Bell, Menu, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  
  const navItems = [
    { icon: Home, label: 'Home', path: '/dashboard' },
    { icon: Send, label: 'Transfer', path: '/transfer' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];
  
  const isActive = (path: string) => location.pathname === path;
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <>
      {/* Mobile top bar */}
      <header className="fixed top-0 inset-x-0 h-16 flex items-center justify-between bg-white/80 backdrop-blur-md z-50 border-b border-slate-200/80 px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
          <h1 className="text-xl font-medium">EasyFinTransfer</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-fintech-blue rounded-full"></span>
            <span className="sr-only">Notifications</span>
          </Button>
          <Avatar className="h-9 w-9">
            <AvatarImage src="" alt="Profile" />
            <AvatarFallback className="bg-fintech-blue text-white text-sm">JD</AvatarFallback>
          </Avatar>
        </div>
      </header>
      
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                to={item.path}
                key={item.path}
                className="text-gray-900 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium"
                onClick={toggleMenu}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
      
      {/* Mobile bottom bar */}
      <nav className="fixed bottom-0 inset-x-0 bg-white/80 backdrop-blur-md border-t border-slate-200/80 z-50 md:hidden">
        <div className="flex items-center justify-around h-16 px-4">
          {navItems.map((item) => (
            <button
              key={item.path}
              className={`flex flex-col items-center justify-center gap-1 p-2 rounded-lg transition-colors ${
                isActive(item.path) ? 'text-fintech-blue' : 'text-slate-600'
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
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-slate-200/80 z-50 hidden md:flex md:flex-col">
        <div className="p-6">
          <h2 className="text-2xl font-medium">EasyFinTransfer</h2>
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.path}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-md transition-colors ${
                isActive(item.path)
                  ? 'bg-fintech-blue text-white'
                  : 'hover:bg-slate-100'
              }`}
              onClick={() => navigate(item.path)}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-200/80">
          <button
            className="flex items-center gap-3 w-full px-4 py-3 rounded-md transition-colors hover:bg-slate-100"
            onClick={() => navigate('/')}
          >
            <User className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default NavBar;
