
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Header = () => {
  const navigate = useNavigate();
  
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <h1 className="text-xl font-semibold text-primary">Moneta</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/features" className="text-slate-600 hover:text-primary transition-colors">Features</a>
            <a href="/how-it-works" className="text-slate-600 hover:text-primary transition-colors">How It Works</a>
            <Button 
              variant="outline"
              onClick={() => navigate('/login')}
            >
              Log in
            </Button>
            <Button 
              onClick={() => navigate('/signup')}
              className="bg-primary hover:bg-primary/90"
            >
              Sign up
            </Button>
          </nav>
          <div className="md:hidden">
            <Button 
              variant="outline"
              onClick={() => navigate('/login')}
            >
              Log in
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
