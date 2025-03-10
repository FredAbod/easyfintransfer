import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import NavBar from '@/components/shared/NavBar';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowUp, Building, CreditCard, DollarSign } from 'lucide-react';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { withdrawFunds } from '@/services/transactionService';
import { WithdrawRequest } from '@/services/types/transactionTypes';

const Withdraw = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [amount, setAmount] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [bankCode, setBankCode] = useState('044'); // Default to Access Bank
  const [narration, setNarration] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount.trim() || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid withdrawal amount greater than zero.",
        variant: "destructive",
      });
      return;
    }
    
    if (!accountNumber.trim() || accountNumber.length < 10) {
      toast({
        title: "Invalid Account Number",
        description: "Please enter a valid account number.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Generate a unique reference for this transaction
    const reference = 'WD_' + Date.now().toString();
    
    try {
      // Create the withdraw request data
      const withdrawData: WithdrawRequest = {
        account_bank: bankCode,
        account_number: accountNumber,
        amount: Number(amount),
        narration: narration || "Withdrawal from account",
        currency: "NGN",
        reference: reference,
        debit_currency: "NGN"
      };

      // Call the withdraw function
      const response = await withdrawFunds(withdrawData);
      
      // Check response status (fixed type issue)
      if (response && response.status === "success") {
        setIsSuccess(true);
        toast({
          title: "Withdrawal Initiated",
          description: `₦${amount} withdrawal has been initiated to your bank account.`,
          variant: "default",
        });
        
        // Wait for 5 seconds before redirecting to dashboard
        setTimeout(() => {
          navigate('/dashboard');
        }, 5000);
      } else {
        // Fixed type issue by adding null check
        throw new Error(response && response.message ? response.message : "Withdrawal failed");
      }
    } catch (error) {
      console.error("Withdrawal error:", error);
      setIsSuccess(false);
      toast({
        title: "Withdrawal Failed",
        description: "We couldn't process your withdrawal at this time. Please try again later.",
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
          <h2 className="text-2xl font-medium text-slate-900">Withdraw Funds</h2>
          <p className="text-slate-500">Transfer money to your bank account</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2 shadow-sm bg-white">
            <CardHeader>
              <CardTitle>Make a Withdrawal</CardTitle>
              <CardDescription>
                Enter your bank details and the amount you'd like to withdraw
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              {isSuccess === null ? (
                <form onSubmit={handleWithdraw} className="space-y-6">
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
                    <p className="text-sm text-slate-500">Available balance: ₦{user?.accountBalance?.$numberDecimal || '0.00'}</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="accountNumber">Account Number</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <CreditCard className="h-5 w-5 text-slate-400" />
                      </div>
                      <Input
                        id="accountNumber"
                        type="text"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        className="pl-10"
                        placeholder="Enter your account number"
                        maxLength={10}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bankCode">Bank</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Building className="h-5 w-5 text-slate-400" />
                      </div>
                      <select
                        id="bankCode"
                        value={bankCode}
                        onChange={(e) => setBankCode(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background pl-10 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        required
                      >
                        <option value="044">Access Bank</option>
                        <option value="058">Guaranty Trust Bank</option>
                        <option value="057">Zenith Bank</option>
                        <option value="011">First Bank</option>
                        <option value="033">United Bank for Africa</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="narration">Description (Optional)</Label>
                    <Input
                      id="narration"
                      value={narration}
                      onChange={(e) => setNarration(e.target.value)}
                      placeholder="What's this withdrawal for?"
                      className="h-12"
                    />
                  </div>
                  
                  <AnimatedButton 
                    type="submit" 
                    variant="default"
                    className="w-full h-12" 
                    isLoading={isLoading}
                  >
                    Withdraw Funds
                  </AnimatedButton>
                </form>
              ) : isSuccess ? (
                <div className="py-8 space-y-4 text-center">
                  <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                    <ArrowUp className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold">Withdrawal Successful!</h3>
                  <p className="text-slate-500">
                    ₦{amount} has been initiated for withdrawal to your bank account.
                  </p>
                  <Button 
                    variant="default"
                    className="mt-4" 
                    onClick={() => navigate('/dashboard')}
                  >
                    Back to Dashboard
                  </Button>
                </div>
              ) : (
                <div className="py-8 space-y-4 text-center">
                  <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center mx-auto">
                    <ArrowUp className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold">Withdrawal Failed</h3>
                  <p className="text-slate-500">
                    We couldn't process your withdrawal at this time. Please try again later.
                  </p>
                  <Button 
                    variant="default"
                    className="mt-4" 
                    onClick={() => setIsSuccess(null)}
                  >
                    Try Again
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card className="md:col-span-1 shadow-sm bg-white">
            <CardHeader>
              <CardTitle>Withdrawal Information</CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-md space-y-2">
                <h4 className="font-medium">Processing Time</h4>
                <p className="text-sm text-slate-500">Withdrawals typically process within 1-2 business days depending on your bank.</p>
              </div>
              
              <div className="p-4 bg-slate-50 rounded-md space-y-2">
                <h4 className="font-medium">Withdrawal Limits</h4>
                <p className="text-sm text-slate-500">Minimum withdrawal: ₦1,000</p>
                <p className="text-sm text-slate-500">Maximum withdrawal: ₦1,000,000</p>
              </div>
              
              <div className="p-4 bg-slate-50 rounded-md space-y-2">
                <h4 className="font-medium">Need Help?</h4>
                <p className="text-sm text-slate-500">Contact our support team for assistance with withdrawals.</p>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col items-start">
              <p className="text-sm text-slate-500 mb-2">Problems with your withdrawal?</p>
              <Button variant="link" className="p-0 h-auto text-blue-600">
                Contact Support
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Withdraw;
