
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EyeOff, Eye, ArrowDown, PlusCircle, ArrowUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BalanceCardProps {
  accountBalance: string;
}

const BalanceCard = ({ accountBalance }: BalanceCardProps) => {
  const navigate = useNavigate();
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);

  return (
    <Card className="mb-6 overflow-hidden shadow-md rounded-xl bg-white border-none">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-sm text-slate-500">Total Balance</p>
            <div className="flex items-center justify-center md:justify-start gap-2">
              {isBalanceVisible ? (
                <h3 className="text-3xl font-semibold">₦{accountBalance}</h3>
              ) : (
                <h3 className="text-3xl font-semibold">••••••</h3>
              )}
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsBalanceVisible(!isBalanceVisible)}
                className="hover:bg-slate-100 rounded-full"
              >
                {isBalanceVisible ? (
                  <EyeOff className="h-5 w-5 text-slate-500" />
                ) : (
                  <Eye className="h-5 w-5 text-slate-500" />
                )}
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-2">
            <Button 
              className="gap-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200"
              onClick={() => navigate('/deposit')}
            >
              <ArrowDown className="h-4 w-4" />
              Deposit
            </Button>
            
            <Button 
              className="gap-2 rounded-xl bg-green-50 hover:bg-green-100 text-green-600 border border-green-200"
              onClick={() => navigate('/withdraw')}
            >
              <ArrowUp className="h-4 w-4" />
              Withdraw
            </Button>
            
            <Button 
              className="gap-2 rounded-xl bg-primary hover:bg-primary/90 text-white"
              onClick={() => navigate('/transfer')}
            >
              <PlusCircle className="h-4 w-4" />
              Transfer
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/5 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <ArrowDown className="h-5 w-5 text-blue-600" />
              <p className="text-sm font-medium">Income</p>
            </div>
            <p className="text-xl font-semibold">₦****</p>
            <p className="text-xs text-slate-500 mt-1">Last 30 days</p>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500/10 to-purple-600/5 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <ArrowUp className="h-5 w-5 text-purple-600" />
              <p className="text-sm font-medium">Expenses</p>
            </div>
            <p className="text-xl font-semibold">₦***</p>
            <p className="text-xs text-slate-500 mt-1">Last 30 days</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BalanceCard;
