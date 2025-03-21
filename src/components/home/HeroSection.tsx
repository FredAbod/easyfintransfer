
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CreditCard, ArrowRight, Shield, Clock, Star } from 'lucide-react';
import AnimatedButton from '@/components/ui/AnimatedButton';

const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-12 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-6 leading-tight">
              Simple, Secure <span className="text-primary">Money Transfers</span> in Seconds
            </h2>
            <p className="text-lg text-slate-600 mb-6">
              Easily move money between your accounts with our intuitive and secure platform. No fees, no waiting, no hassle.
            </p>
            
            {/* Highlighted benefits */}
            <div className="mb-8 space-y-3">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <span className="text-slate-700">Bank-level security protection</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <span className="text-slate-700">Instant transfers, 24/7 availability</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-primary" />
                <span className="text-slate-700">Rated 4.9/5 by our customers</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="default" 
                size="lg" 
                className="relative overflow-hidden group px-8 py-6 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => navigate('/signup')}
              >
                <span className="relative z-10 flex items-center justify-center gap-2 text-lg font-medium">
                  Get Started
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-white/10 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></span>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-6 rounded-xl text-lg font-medium border-2 border-slate-300 hover:border-primary hover:bg-primary/5 text-slate-700 hover:text-primary transition-all duration-300"
                onClick={() => navigate('/login')}
              >
                Log in
              </Button>
            </div>
          </div>
          
          {/* Right side content - transaction preview */}
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
                <div className="bg-white/50 rounded-lg p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Netflix Subscription</p>
                        <p className="text-sm text-slate-500">3 days ago</p>
                      </div>
                    </div>
                    <p className="font-medium text-red-600">-$14.99</p>
                  </div>
                </div>
              </div>
              
              {/* Mobile app promo banner */}
              <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
                <p className="text-center text-sm text-slate-700 font-medium">
                  Download our mobile app for on-the-go access
                </p>
                <div className="flex justify-center gap-2 mt-2">
                  <Button variant="outline" size="sm" className="text-xs h-8">
                    App Store
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs h-8">
                    Google Play
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
