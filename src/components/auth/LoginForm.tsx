
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Fingerprint } from 'lucide-react';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { loginUser } from '@/services/api';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/hooks/use-toast';

const LoginForm = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const userData = await loginUser({
        email: formData.email,
        password: formData.password,
      });
      
      // Set user in auth context
      setUser({
        _id: userData.user._id,
        email: userData.user.email,
        username: userData.user.username || '',
        phone: userData.user.phoneNumber || '',
        token: userData.token,
      });
      
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      // Toast notification is already handled in the API function
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-scale w-full max-w-md mx-auto">
      <Card className="glass-panel border-opacity-10">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl text-center font-medium">Welcome Back</CardTitle>
          <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
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
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <button type="button" className="text-sm text-fintech-blue hover:underline">
                  Forgot password?
                </button>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                className="h-12 bg-white/50 backdrop-blur-sm"
              />
            </div>
            
            <AnimatedButton 
              type="submit" 
              className="w-full h-12 text-base font-medium" 
              variant="primary"
              isLoading={isLoading}
            >
              Sign In
            </AnimatedButton>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <div className="flex items-center gap-4 w-full">
            <div className="h-px bg-gray-200 flex-1"></div>
            <span className="text-sm text-gray-500">or continue with</span>
            <div className="h-px bg-gray-200 flex-1"></div>
          </div>
          
          <button 
            type="button"
            className="flex items-center justify-center gap-2 w-full h-12 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all button-hover"
          >
            <Fingerprint className="h-5 w-5" />
            <span>Biometric Login</span>
          </button>
          
          <div className="text-center text-sm mt-4">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/signup')}
              className="text-fintech-blue hover:underline font-medium"
            >
              Sign up
            </button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginForm;
