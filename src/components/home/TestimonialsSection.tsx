
import React from 'react';
import { QuoteIcon } from 'lucide-react';

const testimonials = [
  {
    quote: "Moneta has completely transformed how I manage my finances. The transfers are instant, and the interface is incredibly intuitive. I've recommended it to all my friends and family.",
    author: "Sarah Johnson",
    title: "Small Business Owner",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg"
  },
  {
    quote: "I was skeptical at first, but after using Moneta for just a week, I was convinced. The security features give me peace of mind, and the savings tools have helped me reach my goals faster.",
    author: "Michael Chen",
    title: "Software Engineer",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg"
  },
  {
    quote: "As someone who travels frequently, having access to my money anytime, anywhere is crucial. Moneta delivers on this promise flawlessly. The mobile app is a game-changer.",
    author: "Emma Rodriguez",
    title: "Travel Blogger",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg"
  },
  {
    quote: "The customer service team at Moneta is exceptional. They resolved my issue within minutes and followed up to ensure everything was working smoothly. Five stars!",
    author: "David Thompson",
    title: "Retail Manager",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">
            Testimonials
          </span>
          <h2 className="text-3xl font-semibold text-slate-900 mb-4">What Our Users Say</h2>
          <p className="text-lg text-slate-600">
            Don't just take our word for it — hear from some of our satisfied users who have transformed their financial lives with Moneta.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-slate-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <QuoteIcon className="h-8 w-8 text-primary/30 mb-4" />
              <p className="text-slate-700 mb-6 italic">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.author} 
                  className="h-12 w-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-medium text-slate-900">{testimonial.author}</h4>
                  <p className="text-sm text-slate-500">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Stats section */}
        <div className="mt-20 bg-primary/5 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">10M+</p>
              <p className="text-slate-600">Active Users</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">$50B+</p>
              <p className="text-slate-600">Transferred</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">99.9%</p>
              <p className="text-slate-600">Uptime</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">150+</p>
              <p className="text-slate-600">Countries</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
