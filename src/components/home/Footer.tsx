
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-xl font-semibold text-primary">Moneta</h2>
            <p className="text-slate-500 mt-2">Simple, secure money transfers</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 md:gap-12">
            <div>
              <h3 className="font-medium mb-3">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-500 hover:text-primary">Features</a></li>
                <li><a href="#" className="text-slate-500 hover:text-primary">Security</a></li>
                <li><a href="#" className="text-slate-500 hover:text-primary">Pricing</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-500 hover:text-primary">About</a></li>
                <li><a href="#" className="text-slate-500 hover:text-primary">Blog</a></li>
                <li><a href="#" className="text-slate-500 hover:text-primary">Careers</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-500 hover:text-primary">Help Center</a></li>
                <li><a href="#" className="text-slate-500 hover:text-primary">Contact</a></li>
                <li><a href="#" className="text-slate-500 hover:text-primary">Privacy</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-200 mt-12 pt-8 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} Moneta. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
