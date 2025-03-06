
import React from 'react';
import { UserPlus, Shield, Layout, SendHorizontal, LineChart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const HowItWorks = () => {
  const navigate = useNavigate();

  const steps = [
    {
      icon: <UserPlus className="w-12 h-12 text-primary" />,
      title: "Sign Up",
      description: "Create your account with just your email and password. Quick, simple, and secure.",
    },
    {
      icon: <Shield className="w-12 h-12 text-primary" />,
      title: "Verify Your Identity",
      description: "Add your phone number and create a unique username to secure your account.",
    },
    {
      icon: <Layout className="w-12 h-12 text-primary" />,
      title: "Explore Your Dashboard",
      description: "Access your personalized dashboard to view your balance, transaction history, and more.",
    },
    {
      icon: <SendHorizontal className="w-12 h-12 text-primary" />,
      title: "Transfer Money",
      description: "Send money instantly using our intuitive interface. Fast, secure, and hassle-free.",
    },
    {
      icon: <LineChart className="w-12 h-12 text-primary" />,
      title: "Track & Manage",
      description: "Monitor your transactions and savings with detailed, real-time insights.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">How It Works</h1>
            <Button onClick={() => navigate('/signup')} className="bg-primary">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Your Journey with Moneta
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get started with Moneta in just a few simple steps. Experience the future of financial management.
          </p>
        </div>

        <div className="space-y-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-center gap-8 bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="md:w-1/4 flex justify-center">
                {step.icon}
                <div className="absolute w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center -mt-4 -ml-4">
                  {index + 1}
                </div>
              </div>
              <div className="md:w-3/4 text-center md:text-left">
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default HowItWorks;
