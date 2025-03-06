import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CreditCard, Shield, Smartphone, ArrowRight } from 'lucide-react';
import AnimatedButton from '@/components/ui/AnimatedButton';

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header/Navigation */}
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

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12 animate-slide-up">
              <h2 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-6 leading-tight">
                Simple, Secure <span className="text-primary">Money Transfers</span> in Seconds
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Easily move money between your accounts with our intuitive and secure platform. No fees, no waiting, no hassle.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <AnimatedButton 
                  variant="primary"
                  size="lg"
                  className="gap-2"
                  onClick={() => navigate('/signup')}
                >
                  Get Started
                  <ArrowRight className="h-5 w-5" />
                </AnimatedButton>
                <Button 
                  variant="outline"
                  size="lg"
                  onClick={() => navigate('/login')}
                >
                  Log in
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 mt-12 md:mt-0 animate-scale">
              <div className="glass-panel rounded-3xl overflow-hidden max-w-md mx-auto p-6 md:p-8">
                <div className="bg-primary rounded-xl p-4 text-white mb-6">
                  <p className="text-sm font-medium mb-1">Your Balance</p>
                  <p className="text-2xl font-semibold">$8,250.50</p>
                </div>
                <div className="space-y-4">
                  <div className="bg-white/50 rounded-lg p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                          <CreditCard className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">Salary Deposit</p>
                          <p className="text-sm text-slate-500">Today, 10:45 AM</p>
                        </div>
                      </div>
                      <p className="font-medium text-green-600">+$1,250.00</p>
                    </div>
                  </div>
                  <div className="bg-white/50 rounded-lg p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                          <CreditCard className="h-5 w-5 text-red-600" />
                        </div>
                        <div>
                          <p className="font-medium">Grocery Store</p>
                          <p className="text-sm text-slate-500">Yesterday, 2:30 PM</p>
                        </div>
                      </div>
                      <p className="font-medium text-red-600">-$85.25</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-semibold text-slate-900 mb-4">Features Designed for You</h2>
            <p className="text-lg text-slate-600">
              Everything you need to manage your money efficiently and securely.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow animate-in">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Smartphone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-3">Mobile First</h3>
              <p className="text-slate-600">
                Designed for the modern user, our platform works seamlessly on all devices.
              </p>
            </div>
            
            <div className="bg-slate-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow animate-in">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-3">Secure Transfers</h3>
              <p className="text-slate-600">
                Built with security in mind, all your financial data and transactions are protected.
              </p>
            </div>
            
            <div className="bg-slate-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow animate-in">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-3">Zero Fees</h3>
              <p className="text-slate-600">
                Transfer money between your accounts without any hidden charges or fees.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-semibold text-slate-900 mb-4">How It Works</h2>
            <p className="text-lg text-slate-600">
              Getting started with EasyFinTransfer is simple and straightforward.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="bg-white rounded-xl p-6 shadow-sm md:w-1/3 animate-in">
              <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center mb-4 font-bold">1</div>
              <h3 className="text-xl font-medium mb-2">Create an Account</h3>
              <p className="text-slate-600">
                Sign up for an account with your email and set a secure password.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm md:w-1/3 animate-in">
              <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center mb-4 font-bold">2</div>
              <h3 className="text-xl font-medium mb-2">Link Your Accounts</h3>
              <p className="text-slate-600">
                Connect your bank accounts securely to start transferring money.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm md:w-1/3 animate-in">
              <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center mb-4 font-bold">3</div>
              <h3 className="text-xl font-medium mb-2">Start Transferring</h3>
              <p className="text-slate-600">
                Send money between your accounts with just a few taps.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <AnimatedButton 
              variant="primary"
              size="lg"
              className="gap-2"
              onClick={() => navigate('/signup')}
            >
              Get Started Now
              <ArrowRight className="h-5 w-5" />
            </AnimatedButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-xl font-semibold text-primary">Moneta</h2>
              <p className="text-slate-500 mt-2">Simple, secure money transfers</p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6 md:gap-12">
              <div>
                <h3 className="font-medium mb-3">Product</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-slate-500 hover:text-primary">Features</a></li>
                  <li><a href="#" className="text-slate-500 hover:text-primary">Security</a></li>
                  <li><a href="#" className="text-slate-500 hover:text-primary">Pricing</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Company</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-slate-500 hover:text-primary">About</a></li>
                  <li><a href="#" className="text-slate-500 hover:text-primary">Blog</a></li>
                  <li><a href="#" className="text-slate-500 hover:text-primary">Careers</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Support</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-slate-500 hover:text-primary">Help Center</a></li>
                  <li><a href="#" className="text-slate-500 hover:text-primary">Contact</a></li>
                  <li><a href="#" className="text-slate-500 hover:text-primary">Privacy</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-200 mt-12 pt-8 text-center text-sm text-slate-500">
            <p>&copy; {new Date().getFullYear()} Moneta. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
