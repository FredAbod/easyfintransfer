
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CreditCard, ArrowRight } from 'lucide-react';
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
  );
};

export default HeroSection;
