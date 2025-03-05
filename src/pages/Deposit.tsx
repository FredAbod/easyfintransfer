
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import NavBar from '@/components/shared/NavBar';
import { useAuth } from '@/contexts/AuthContext';
import { AtSign, DollarSign, CreditCard, Wallet, ArrowRight } from 'lucide-react';
import { depositFunds } from '@/services/api';

const Deposit = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [email, setEmail] = useState(user?.email || '');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: "Email Required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }
    
    if (!amount.trim() || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid deposit amount greater than zero.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await depositFunds({ email, amount: Number(amount) });
      
      if (response.status === 'success') {
        toast({
          title: "Deposit Successful!",
          description: `$${amount} has been added to your account.`,
          variant: "default",
        });
        
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        toast({
          title: "Deposit Failed",
          description: response.message || "There was an error processing your deposit.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20 md:pl-64">
      <NavBar />
      
      <main className="pt-20 px-4 md:px-8 max-w-5xl mx-auto animate-fade-in">
        <div className="mb-8">
          <h2 className="text-2xl font-medium text-slate-900">Deposit Funds</h2>
          <p className="text-slate-500">Add money to your account</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2 shadow-sm bg-white">
            <CardHeader>
              <CardTitle>Make a Deposit</CardTitle>
              <CardDescription>
                Enter your email and the amount you'd like to deposit
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleDeposit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <AtSign className="h-5 w-5 text-slate-400" />
                    </div>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <DollarSign className="h-5 w-5 text-slate-400" />
                    </div>
                    <Input
                      id="amount"
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="pl-10"
                      placeholder="Enter amount"
                      step="0.01"
                      min="0.01"
                      required
                    />
                  </div>
                  <p className="text-sm text-slate-500">Minimum deposit amount: $0.01</p>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? 'Processing...' : 'Deposit Funds'}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-1 shadow-sm bg-white">
            <CardHeader>
              <CardTitle>Deposit Options</CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-md flex items-center gap-3">
                <CreditCard className="h-5 w-5 text-fintech-blue" />
                <div>
                  <p className="font-medium">Credit Card</p>
                  <p className="text-sm text-slate-500">Instant deposit</p>
                </div>
                <ArrowRight className="h-4 w-4 ml-auto" />
              </div>
              
              <div className="p-4 bg-slate-50 rounded-md flex items-center gap-3">
                <Wallet className="h-5 w-5 text-fintech-blue" />
                <div>
                  <p className="font-medium">Bank Transfer</p>
                  <p className="text-sm text-slate-500">1-3 business days</p>
                </div>
                <ArrowRight className="h-4 w-4 ml-auto" />
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col items-start pt-0">
              <p className="text-sm text-slate-500 mb-2">Need help?</p>
              <Button variant="link" className="p-0 h-auto text-fintech-blue">
                View our deposit guide
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Deposit;
