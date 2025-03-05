
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { addUsername } from '@/services/api';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';

const UsernameForm = () => {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const { setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const validateUsername = (name: string) => {
    // Simple validation for demonstration - enhance as needed
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(name);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateUsername(username)) {
      toast({
        title: "Invalid Username",
        description: "Username must be 3-20 characters and contain only letters, numbers, and underscores.",
        variant: "destructive",
      });
      return;
    }
    
    if (!userId) {
      toast({
        title: "Error",
        description: "User ID is missing. Please try signing up again.",
        variant: "destructive",
      });
      navigate('/signup');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const userData = await addUsername(userId, { username });
      
      toast({
        title: "Success",
        description: "Username set successfully! Your account is now complete.",
      });
      
      // Update auth context with user data
      setUser({
        _id: userId,
        email: userData.email || "",
        username: username,
        phone: userData.phoneNumber || "",
      });
      
      // Navigate to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Username addition failed:', error);
      // Toast notification is already handled in the API function
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-scale w-full max-w-md mx-auto">
      <Card className="glass-panel border-opacity-10">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl text-center font-medium">Choose Your Username</CardTitle>
          <CardDescription className="text-center">Pick a unique username for your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="johnsmith123"
                required
                value={username}
                onChange={handleChange}
                className="h-12 bg-white/50 backdrop-blur-sm"
              />
              <p className="text-xs text-muted-foreground">
                Choose a username between 3-20 characters using letters, numbers, and underscores.
              </p>
            </div>
            
            <AnimatedButton 
              type="submit" 
              className="w-full h-12 text-base font-medium" 
              variant="primary"
              isLoading={isLoading}
            >
              Complete Setup
            </AnimatedButton>
          </form>
        </CardContent>
        <CardFooter>
          <div className="text-center text-sm w-full">
            <p className="text-muted-foreground">
              Step 3 of 3: Final Step
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UsernameForm;
