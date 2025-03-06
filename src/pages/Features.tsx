
import React from 'react';
import FeaturesHeader from '@/components/features/FeaturesHeader';
import FeaturesList from '@/components/features/FeaturesList';

const Features = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <FeaturesHeader />

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

        <FeaturesList />
      </main>
    </div>
  );
};

export default Features;
