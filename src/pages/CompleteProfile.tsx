import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { AlertCircle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { useToast } from "@/components/ui/use-toast";

const CompleteProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, addPhoneNumber, addUsername } = useAuth();
  const { toast } = useToast();
  
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');
  const [userName, setUserName] = useState(user?.userName || '');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(location.state?.step || 1);
  
  // Only check if we should move to step 2 based on user data, not authentication
  useEffect(() => {
    if (user?.phoneNumber && step === 1) {
      setStep(2);
    }
  }, [user, step]);
  
  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phoneNumber) {
      setError('Please enter a phone number');
      return;
    }
    
    setLoading(true);
    try {
      console.log("Submitting phone number:", phoneNumber);
      const response = await addPhoneNumber(phoneNumber);
      console.log("Phone number response:", response);
      
      // Updated check for success
      if (response.status === 'success') {
        toast({
          title: "Phone number added!",
          description: "Now let's choose your username.",
          variant: "default",
        });
        setStep(2); // Move to username step
      } else {
        setError(response.message || 'Failed to add phone number');
      }
    } catch (err: any) {
      console.error("Phone number error:", err);
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };
  
  const handleUsernameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userName) {
      setError('Please enter a username');
      return;
    }
    
    setLoading(true);
    try {
      console.log("Submitting username:", userName);
      const response = await addUsername(userName);
      console.log("Username response:", response);
      
      // Updated check for success
      if (response.status === 'success') {
        toast({
          title: "Profile completed!",
          description: "Your account is now fully set up.",
          variant: "default",
        });
        
        // Force a small delay to ensure state is updated
        setTimeout(() => {
          navigate('/dashboard');
        }, 100);
      } else {
        setError(response.message || 'Failed to add username');
      }
    } catch (err: any) {
      console.error("Username error:", err);
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center items-center p-4">
      <div className="w-full max-w-md">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl">Complete Your Profile</CardTitle>
            <CardDescription>
              Just a few more details to get you started
            </CardDescription>
            <Progress value={step === 1 ? 50 : 100} className="mt-2" />
          </CardHeader>
          
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {step === 1 ? (
              <form onSubmit={handlePhoneSubmit}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input 
                      id="phoneNumber" 
                      type="tel" 
                      placeholder="Your phone number" 
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
                    <p className="text-sm text-slate-500">
                      Please enter a valid phone number for verification
                    </p>
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      'Continue'
                    )}
                  </Button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleUsernameSubmit}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="userName">Username</Label>
                    <Input 
                      id="userName" 
                      type="text" 
                      placeholder="Choose a username" 
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      required
                    />
                    <p className="text-sm text-slate-500">
                      This will be your unique identifier on our platform
                    </p>
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Completing Setup...
                      </>
                    ) : (
                      'Complete Setup'
                    )}
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
          
          <CardFooter className="flex justify-center">
            <div className="text-sm text-slate-500">
              {step === 1 
                ? 'Step 1 of 2: Add Phone Number' 
                : 'Step 2 of 2: Choose Username'}
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default CompleteProfile;
