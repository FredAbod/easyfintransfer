
import React from 'react';
import { Shield, Zap, LineChart, PiggyBank, HeadphonesIcon, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

const Features = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Zap className="w-12 h-12 text-primary" />,
      title: "Instant Money Transfers",
      description: "Experience real-time, seamless transfers with our user-friendly interface. Send and receive money instantly, anytime.",
    },
    {
      icon: <Shield className="w-12 h-12 text-primary" />,
      title: "Top-Notch Security",
      description: "Rest easy with state-of-the-art encryption and robust security protocols protecting your every transaction.",
    },
    {
      icon: <LineChart className="w-12 h-12 text-primary" />,
      title: "Intuitive Dashboard",
      description: "Navigate effortlessly through your finances with our elegantly designed dashboard that puts everything at your fingertips.",
    },
    {
      icon: <PiggyBank className="w-12 h-12 text-primary" />,
      title: "Automated Savings & Budgeting",
      description: "Let our smart tools help you reach your financial goals with automated savings and intelligent budgeting features.",
    },
    {
      icon: <HeadphonesIcon className="w-12 h-12 text-primary" />,
      title: "24/7 Customer Support",
      description: "Our dedicated support team is always ready to assist you, ensuring you never face financial hurdles alone.",
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Features</h1>
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
            Modern Solutions for Modern Money
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From ancient commerce to digital innovation, Moneta brings you the future of financial management.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Features;
