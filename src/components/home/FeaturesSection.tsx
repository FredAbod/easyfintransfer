
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Zap, Shield, PiggyBank, ArrowRight } from 'lucide-react';

const FeaturesSection = () => {
  const navigate = useNavigate();
  
  return (
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
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-3">Instant Transfers</h3>
            <p className="text-slate-600">
              Send and receive money instantly with our lightning-fast payment system. No delays, no waiting.
            </p>
          </div>
          
          <div className="bg-slate-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow animate-in">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-3">Bank-Level Security</h3>
            <p className="text-slate-600">
              Rest easy knowing your money and data are protected by state-of-the-art encryption and security protocols.
            </p>
          </div>
          
          <div className="bg-slate-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow animate-in">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <PiggyBank className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-3">Smart Savings</h3>
            <p className="text-slate-600">
              Achieve your financial goals faster with our intelligent savings tools and personalized recommendations.
            </p>
          </div>
        </div>
        
        <div className="text-center mt-10">
          <Button 
            variant="outline"
            onClick={() => navigate('/features')}
            className="gap-2"
          >
            Explore All Features
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
