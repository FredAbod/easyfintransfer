
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import AnimatedButton from '@/components/ui/AnimatedButton';

const SignupForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, acceptTerms: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="animate-scale w-full max-w-md mx-auto">
      <Card className="glass-panel border-opacity-10">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl text-center font-medium">Create Account</CardTitle>
          <CardDescription className="text-center">Enter your details to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="John Doe"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="h-12 bg-white/50 backdrop-blur-sm"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                required
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                className="h-12 bg-white/50 backdrop-blur-sm"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                className="h-12 bg-white/50 backdrop-blur-sm"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                required
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="h-12 bg-white/50 backdrop-blur-sm"
              />
            </div>
            
            <div className="flex items-center space-x-2 my-6">
              <Checkbox 
                id="acceptTerms" 
                checked={formData.acceptTerms}
                onCheckedChange={handleCheckboxChange}
              />
              <label
                htmlFor="acceptTerms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the <a href="#" className="text-fintech-blue hover:underline">Terms of Service</a> and <a href="#" className="text-fintech-blue hover:underline">Privacy Policy</a>
              </label>
            </div>
            
            <AnimatedButton 
              type="submit" 
              className="w-full h-12 text-base font-medium" 
              variant="primary"
              isLoading={isLoading}
              disabled={!formData.acceptTerms}
            >
              Create Account
            </AnimatedButton>
          </form>
        </CardContent>
        <CardFooter>
          <div className="text-center text-sm w-full">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-fintech-blue hover:underline font-medium"
            >
              Sign in
            </button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignupForm;
