import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Zap, Shield, PiggyBank, ArrowRight, Globe, BarChart3, Clock, Smartphone } from 'lucide-react';
const FeaturesSection = () => {
  const navigate = useNavigate();
  return <section id="features" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">
            Powerful Features
          </span>
          <h2 className="text-3xl font-semibold text-slate-900 mb-4">Features Designed for You</h2>
          <p className="text-lg text-slate-600">
            Everything you need to manage your money efficiently and securely, with tools built for the modern financial landscape.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          
          
          
          
          
          
          
          
          <div className="rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow animate-in flex flex-col bg-gray-800">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-3">Spending Analytics</h3>
            <p className="text-slate-600 flex-grow">
              Gain valuable insights into your spending habits with detailed analytics and visualizations.
            </p>
          </div>
          
          <div className="bg-slate-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow animate-in flex flex-col">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-3">Scheduled Payments</h3>
            <p className="text-slate-600 flex-grow">
              Set up recurring transfers and bill payments to automate your financial routines and never miss a deadline.
            </p>
          </div>
          
          <div className="bg-slate-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow animate-in flex flex-col">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <Smartphone className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-3">Mobile Access</h3>
            <p className="text-slate-600 flex-grow">
              Manage your finances on the go with our intuitive mobile app, available for both iOS and Android devices.
            </p>
          </div>
          
          <div className="bg-slate-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow animate-in flex flex-col">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-3">24/7 Support</h3>
            <p className="text-slate-600 flex-grow">
              Get help whenever you need it with our round-the-clock customer support team, available via chat, email, or phone.
            </p>
          </div>
        </div>
        
        <div className="text-center mt-10">
          <Button variant="outline" onClick={() => navigate('/features')} className="gap-2">
            Explore All Features
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>;
};
export default FeaturesSection;