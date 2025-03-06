
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Shield, SendHorizontal, ArrowRight } from 'lucide-react';
import AnimatedButton from '@/components/ui/AnimatedButton';

const HowItWorksSection = () => {
  const navigate = useNavigate();
  
  return (
    <section id="how-it-works" className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-semibold text-slate-900 mb-4">How It Works</h2>
          <p className="text-lg text-slate-600">
            Getting started with Moneta is simple and straightforward.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 items-stretch">
          <div className="bg-white rounded-xl p-6 shadow-sm md:w-1/3 animate-in flex flex-col">
            <div className="mb-4 flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">1</div>
              <h3 className="text-xl font-medium">Create an Account</h3>
            </div>
            <div className="flex-grow">
              <p className="text-slate-600">
                Sign up in minutes with just your email and password. Our streamlined process gets you started quickly and securely.
              </p>
            </div>
            <div className="mt-4 text-primary">
              <UserPlus className="h-8 w-8 mx-auto opacity-50" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm md:w-1/3 animate-in flex flex-col">
            <div className="mb-4 flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">2</div>
              <h3 className="text-xl font-medium">Verify Identity</h3>
            </div>
            <div className="flex-grow">
              <p className="text-slate-600">
                Enhance your account security by adding your phone number and creating a unique username that represents you.
              </p>
            </div>
            <div className="mt-4 text-primary">
              <Shield className="h-8 w-8 mx-auto opacity-50" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm md:w-1/3 animate-in flex flex-col">
            <div className="mb-4 flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">3</div>
              <h3 className="text-xl font-medium">Start Using Moneta</h3>
            </div>
            <div className="flex-grow">
              <p className="text-slate-600">
                Access your dashboard, send money, track transactions, and manage your finances with our intuitive interface.
              </p>
            </div>
            <div className="mt-4 text-primary">
              <SendHorizontal className="h-8 w-8 mx-auto opacity-50" />
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <AnimatedButton 
            variant="primary"
            size="lg"
            className="gap-2"
            onClick={() => navigate('/how-it-works')}
          >
            Learn More
            <ArrowRight className="h-5 w-5" />
          </AnimatedButton>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
