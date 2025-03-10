
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import NavBar from '@/components/shared/NavBar';
import { useAuth } from '@/contexts/AuthContext';

const Signin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  // Redirect to dashboard if user is already logged in
  React.useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-slate-50">
      <NavBar />
      
      <main className="pt-20 px-4 md:px-8 max-w-5xl mx-auto">
        <div className="flex flex-col items-center justify-center min-h-[80vh]">
          <Card className="w-full max-w-md shadow-md">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
              <CardDescription className="text-center">
                Enter your email and password to sign in to your account
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              {/* Login form would go here, but we'll redirect to the Login page for now */}
              <div className="text-center py-4">Redirecting to login...</div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button 
                className="w-full mb-4" 
                onClick={() => navigate('/login')}
              >
                Go to Login
              </Button>
              <div className="text-sm text-center text-gray-500 mt-2">
                Don't have an account?{" "}
                <Button variant="link" className="p-0 h-auto" onClick={() => navigate('/signup')}>
                  Sign up
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Signin;
