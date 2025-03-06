
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <h1 className="text-xl font-semibold text-primary">Moneta</h1>
          </div>
          
          {/* Desktop Navigation */}
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
          
          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMenu}
              className="text-slate-700"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <a href="/features" className="px-2 py-2 text-slate-600 hover:text-primary transition-colors">Features</a>
              <a href="/how-it-works" className="px-2 py-2 text-slate-600 hover:text-primary transition-colors">How It Works</a>
              <div className="flex gap-2 pt-2">
                <Button 
                  variant="outline"
                  onClick={() => navigate('/login')}
                  className="flex-1"
                >
                  Log in
                </Button>
                <Button 
                  onClick={() => navigate('/signup')}
                  className="bg-primary hover:bg-primary/90 flex-1"
                >
                  Sign up
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
