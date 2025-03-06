
import React from 'react';

interface StepCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  stepNumber: number;
}

const StepCard = ({ icon, title, description, stepNumber }: StepCardProps) => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-8 bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="md:w-1/4 flex justify-center relative">
        {icon}
        <div className="absolute w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center -mt-4 -ml-4">
          {stepNumber}
        </div>
      </div>
      <div className="md:w-3/4 text-center md:text-left">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default StepCard;
