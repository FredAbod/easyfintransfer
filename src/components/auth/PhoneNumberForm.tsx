
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { addPhoneNumber } from '@/services/api';
import { toast } from '@/hooks/use-toast';

const PhoneNumberForm = () => {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const validatePhoneNumber = (number: string) => {
    // Simple validation for demonstration - enhance as needed
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    return phoneRegex.test(number);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePhoneNumber(phoneNumber)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid phone number",
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
      await addPhoneNumber(userId, { phoneNumber });
      
      toast({
        title: "Success",
        description: "Phone number added successfully!",
      });
      
      // Navigate to username addition screen
      navigate(`/add-username/${userId}`);
    } catch (error) {
      console.error('Phone number addition failed:', error);
      // Toast notification is already handled in the API function
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-scale w-full max-w-md mx-auto">
      <Card className="glass-panel border-opacity-10">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl text-center font-medium">Add Your Phone Number</CardTitle>
          <CardDescription className="text-center">We need your phone number for account verification</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                placeholder="+1 (555) 123-4567"
                required
                value={phoneNumber}
                onChange={handleChange}
                className="h-12 bg-white/50 backdrop-blur-sm"
              />
              <p className="text-xs text-muted-foreground">
                Enter your phone number including country code (e.g., +1 for US)
              </p>
            </div>
            
            <AnimatedButton 
              type="submit" 
              className="w-full h-12 text-base font-medium" 
              variant="primary"
              isLoading={isLoading}
            >
              Continue
            </AnimatedButton>
          </form>
        </CardContent>
        <CardFooter>
          <div className="text-center text-sm w-full">
            <p className="text-muted-foreground">
              Step 2 of 3: Adding Contact Information
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PhoneNumberForm;
