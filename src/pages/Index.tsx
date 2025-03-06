import React from 'react';
import Header from '@/components/home/Header';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import Footer from '@/components/home/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <HeroSection />
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-12">
        <FeaturesSection />
      </div>
      <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white py-12">
        <HowItWorksSection />
      </div>
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default Index;
