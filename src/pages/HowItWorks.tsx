
import React from 'react';
import HowItWorksHeader from '@/components/how-it-works/HowItWorksHeader';
import StepsList from '@/components/how-it-works/StepsList';

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <HowItWorksHeader />

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

        <StepsList />
      </main>
    </div>
  );
};

export default HowItWorks;
