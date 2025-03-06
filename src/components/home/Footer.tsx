
import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-slate-200 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-1">
            <h2 className="text-xl font-semibold text-primary mb-4">Moneta</h2>
            <p className="text-slate-500 mb-6">
              Simple, secure money transfers for the modern world. Bridging ancient commerce with digital innovation.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-4 text-slate-900">Product</h3>
            <ul className="space-y-3">
              <li><a href="/features" className="text-slate-500 hover:text-primary transition-colors">Features</a></li>
              <li><a href="#" className="text-slate-500 hover:text-primary transition-colors">Security</a></li>
              <li><a href="#" className="text-slate-500 hover:text-primary transition-colors">Pricing</a></li>
              <li><a href="#" className="text-slate-500 hover:text-primary transition-colors">Testimonials</a></li>
              <li><a href="#" className="text-slate-500 hover:text-primary transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4 text-slate-900">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-500 hover:text-primary transition-colors">About</a></li>
              <li><a href="#" className="text-slate-500 hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="text-slate-500 hover:text-primary transition-colors">Careers</a></li>
              <li><a href="#" className="text-slate-500 hover:text-primary transition-colors">Press</a></li>
              <li><a href="#" className="text-slate-500 hover:text-primary transition-colors">Partners</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4 text-slate-900">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-slate-500">support@moneta.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-slate-500">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-slate-500">123 Finance Street<br/>Money City, MC 12345</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-200 pt-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h3 className="text-lg font-medium text-slate-900">Subscribe to our newsletter</h3>
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-full"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            &copy; {currentYear} Moneta. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-500">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
