
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import NavBar from '@/components/shared/NavBar';
import AnimatedButton from '@/components/ui/AnimatedButton';

const TransferForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [formData, setFormData] = useState({
    amount: '',
    fromAccount: 'main',
    toAccount: 'savings',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContinue = () => {
    if (step === 1) {
      // Validate amount
      if (!formData.amount || parseFloat(formData.amount) <= 0) {
        toast({
          title: "Invalid amount",
          description: "Please enter a valid amount greater than zero.",
          variant: "destructive",
        });
        return;
      }
      
      // Check if accounts are different
      if (formData.fromAccount === formData.toAccount) {
        toast({
          title: "Same account selected",
          description: "Please select different accounts for transfer.",
          variant: "destructive",
        });
        return;
      }
      
      setStep(2);
      return;
    }
    
    if (step === 2) {
      setStep(3);
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        const success = Math.random() > 0.2; // 80% chance of success
        setIsSuccess(success);
        
        if (success) {
          toast({
            title: "Transfer successful!",
            description: `$${formData.amount} has been transferred successfully.`,
          });
        } else {
          toast({
            title: "Transfer failed",
            description: "There was an issue with your transfer. Please try again.",
            variant: "destructive",
          });
        }
      }, 2000);
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    } else if (step === 3) {
      setStep(2);
    }
  };

  const handleGoToDashboard = () => {
    navigate('/dashboard');
  };

  const formatCurrency = (value: string) => {
    // Remove non-digit characters
    const digits = value.replace(/[^\d.]/g, '');
    
    // Ensure only one decimal point
    const parts = digits.split('.');
    if (parts.length > 2) {
      return parts[0] + '.' + parts.slice(1).join('');
    }
    
    return digits;
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const formattedValue = formatCurrency(value);
    setFormData((prev) => ({ ...prev, amount: formattedValue }));
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20 md:pl-64">
      <NavBar />
      
      <main className="pt-20 px-4 md:px-8 max-w-5xl mx-auto animate-fade-in">
        <div className="mb-8">
          <div className="flex items-center gap-4">
            {step > 1 && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleBack}
                disabled={isLoading}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}
            <h2 className="text-2xl font-medium text-slate-900">
              {step === 1 && "Transfer Money"}
              {step === 2 && "Confirm Transfer"}
              {step === 3 && "Transfer Status"}
            </h2>
          </div>
          <p className="text-slate-500 mt-1">
            {step === 1 && "Move funds between your accounts"}
            {step === 2 && "Review your transfer details"}
            {step === 3 && "Processing your transfer request"}
          </p>
        </div>
        
        <Card className="overflow-hidden shadow-sm card-shadow bg-white max-w-md mx-auto">
          {step === 1 && (
            <>
              <CardContent className="p-6 pt-6">
                <form className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                      <Input
                        id="amount"
                        name="amount"
                        type="text"
                        placeholder="0.00"
                        value={formData.amount}
                        onChange={handleAmountChange}
                        className="pl-8 h-12"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="fromAccount">From Account</Label>
                    <Select
                      value={formData.fromAccount}
                      onValueChange={(value) => handleSelectChange('fromAccount', value)}
                    >
                      <SelectTrigger id="fromAccount" className="h-12">
                        <SelectValue placeholder="Select account" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="main">Main Account ($8,250.50)</SelectItem>
                        <SelectItem value="business">Business Account ($3,120.25)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="toAccount">To Account</Label>
                    <Select
                      value={formData.toAccount}
                      onValueChange={(value) => handleSelectChange('toAccount', value)}
                    >
                      <SelectTrigger id="toAccount" className="h-12">
                        <SelectValue placeholder="Select account" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="savings">Savings Account ($2,430.15)</SelectItem>
                        <SelectItem value="investment">Investment Account ($5,670.80)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Input
                      id="description"
                      name="description"
                      placeholder="What's this transfer for?"
                      value={formData.description}
                      onChange={handleChange}
                      className="h-12"
                    />
                  </div>
                </form>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <AnimatedButton 
                  variant="primary"
                  className="w-full h-12"
                  onClick={handleContinue}
                >
                  Continue
                </AnimatedButton>
              </CardFooter>
            </>
          )}
          
          {step === 2 && (
            <>
              <CardContent className="p-6 pt-6">
                <div className="space-y-6">
                  <div className="rounded-lg bg-fintech-blue/5 p-6">
                    <h3 className="text-2xl font-semibold text-center mb-4">${formData.amount}</h3>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <p className="text-slate-500">From</p>
                        <p className="font-medium">
                          {formData.fromAccount === 'main' 
                            ? 'Main Account' 
                            : 'Business Account'}
                        </p>
                      </div>
                      
                      <div className="flex justify-between">
                        <p className="text-slate-500">To</p>
                        <p className="font-medium">
                          {formData.toAccount === 'savings' 
                            ? 'Savings Account' 
                            : 'Investment Account'}
                        </p>
                      </div>
                      
                      {formData.description && (
                        <div className="flex justify-between">
                          <p className="text-slate-500">Description</p>
                          <p className="font-medium">{formData.description}</p>
                        </div>
                      )}
                      
                      <div className="flex justify-between">
                        <p className="text-slate-500">Fee</p>
                        <p className="font-medium">$0.00</p>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-slate-500 text-center">
                    Please confirm the details above before proceeding with the transfer.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <AnimatedButton 
                  variant="primary"
                  className="w-full h-12"
                  onClick={handleContinue}
                >
                  Confirm Transfer
                </AnimatedButton>
              </CardFooter>
            </>
          )}
          
          {step === 3 && (
            <>
              <CardContent className="p-6 pt-6 text-center">
                {isLoading ? (
                  <div className="py-8 space-y-4">
                    <div className="animate-spin h-12 w-12 border-4 border-fintech-blue border-t-transparent rounded-full mx-auto"></div>
                    <p className="text-lg font-medium">Processing your transfer</p>
                    <p className="text-slate-500">This will only take a moment...</p>
                  </div>
                ) : (
                  <div className="py-8 space-y-4">
                    {isSuccess ? (
                      <>
                        <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                          <Check className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-semibold">Transfer Successful!</h3>
                        <p className="text-slate-500">
                          ${formData.amount} has been transferred successfully to your {formData.toAccount === 'savings' ? 'Savings' : 'Investment'} Account.
                        </p>
                      </>
                    ) : (
                      <>
                        <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center mx-auto">
                          <X className="h-8 w-8 text-red-600" />
                        </div>
                        <h3 className="text-xl font-semibold">Transfer Failed</h3>
                        <p className="text-slate-500">
                          We couldn't process your transfer at this time. Please try again later.
                        </p>
                      </>
                    )}
                  </div>
                )}
              </CardContent>
              {!isLoading && (
                <CardFooter className="p-6 pt-0">
                  <AnimatedButton 
                    variant="primary"
                    className="w-full h-12"
                    onClick={handleGoToDashboard}
                  >
                    Back to Dashboard
                  </AnimatedButton>
                </CardFooter>
              )}
            </>
          )}
        </Card>
      </main>
    </div>
  );
};

export default TransferForm;
