
import React from 'react';
import { UserPlus, Shield, Layout, SendHorizontal, LineChart } from 'lucide-react';
import StepCard from './StepCard';

const StepsList = () => {
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
    <div className="space-y-12">
      {steps.map((step, index) => (
        <StepCard
          key={index}
          icon={step.icon}
          title={step.title}
          description={step.description}
          stepNumber={index + 1}
        />
      ))}
    </div>
  );
};

export default StepsList;
