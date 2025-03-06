
import React from 'react';
import { Shield, Zap, LineChart, PiggyBank, HeadphonesIcon } from 'lucide-react';
import FeatureCard from './FeatureCard';

const FeaturesList = () => {
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
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {features.map((feature, index) => (
        <FeatureCard 
          key={index} 
          icon={feature.icon} 
          title={feature.title} 
          description={feature.description} 
        />
      ))}
    </div>
  );
};

export default FeaturesList;
