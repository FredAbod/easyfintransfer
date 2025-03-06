
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Shield, SendHorizontal, ArrowRight, ChevronRight, CreditCard, Smartphone, Bell } from 'lucide-react';
import AnimatedButton from '@/components/ui/AnimatedButton';

const HowItWorksSection = () => {
  const navigate = useNavigate();
  
  return (
    <section id="how-it-works" className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">
            Easy To Use
          </span>
          <h2 className="text-3xl font-semibold text-slate-900 mb-4">How It Works</h2>
          <p className="text-lg text-slate-600">
            Getting started with Moneta is simple and straightforward. Follow these steps to begin your journey to better financial management.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl p-6 shadow-sm animate-in flex flex-col">
            <div className="mb-4 flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">1</div>
              <h3 className="text-xl font-medium">Create an Account</h3>
            </div>
            <div className="flex-grow">
              <p className="text-slate-600 mb-4">
                Sign up in minutes with just your email and password. Our streamlined process gets you started quickly and securely.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-600">Enter your email address</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-600">Create a secure password</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-600">Agree to our terms of service</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 text-primary">
              <UserPlus className="h-8 w-8 mx-auto opacity-50" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm animate-in flex flex-col">
            <div className="mb-4 flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">2</div>
              <h3 className="text-xl font-medium">Verify Identity</h3>
            </div>
            <div className="flex-grow">
              <p className="text-slate-600 mb-4">
                Enhance your account security by adding your phone number and creating a unique username that represents you.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-600">Add and verify your phone number</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-600">Create a unique username</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-600">Set up 2-factor authentication (optional)</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 text-primary">
              <Shield className="h-8 w-8 mx-auto opacity-50" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm animate-in flex flex-col">
            <div className="mb-4 flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">3</div>
              <h3 className="text-xl font-medium">Start Using Moneta</h3>
            </div>
            <div className="flex-grow">
              <p className="text-slate-600 mb-4">
                Access your dashboard, send money, track transactions, and manage your finances with our intuitive interface.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-600">Explore your personalized dashboard</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-600">Make your first money transfer</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-600">Set up notifications for account activity</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 text-primary">
              <SendHorizontal className="h-8 w-8 mx-auto opacity-50" />
            </div>
          </div>
        </div>
        
        {/* Additional information section */}
        <div className="bg-white rounded-xl p-8 shadow-sm mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-medium mb-4">Why Choose Moneta?</h3>
              <p className="text-slate-600 mb-6">
                Moneta combines ancient wisdom with modern technology to create the ultimate financial management experience.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mt-1">
                    <CreditCard className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">No Hidden Fees</h4>
                    <p className="text-sm text-slate-500">Transparent pricing with no surprise charges</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mt-1">
                    <Smartphone className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Mobile-First Design</h4>
                    <p className="text-sm text-slate-500">Optimized for the devices you use every day</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mt-1">
                    <Bell className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Real-Time Notifications</h4>
                    <p className="text-sm text-slate-500">Stay informed about your account activity</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="bg-slate-50 rounded-xl p-6">
                <h4 className="font-medium mb-4">What Our Users Say</h4>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-bold text-sm">JD</span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">John Doe</p>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="h-3 w-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
                              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600">
                      "Moneta has completely transformed how I manage my finances. The interface is intuitive and the transfers are lightning fast!"
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                        <span className="text-purple-600 font-bold text-sm">AS</span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">Amanda Smith</p>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="h-3 w-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
                              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600">
                      "The security features give me peace of mind, and the savings tools have helped me reach my financial goals faster."
                    </p>
                  </div>
                </div>
              </div>
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
