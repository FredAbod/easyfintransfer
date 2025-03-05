import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle, EyeOff, Eye, TrendingUp, CreditCard, ChevronRight, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TransactionItem from '@/components/shared/TransactionItem';
import AnimatedButton from '@/components/ui/AnimatedButton';
import NavBar from '@/components/shared/NavBar';
import { useAuth } from '@/contexts/AuthContext';

const transactions = [
  { id: 1, type: 'incoming' as const, amount: 1250.00, description: 'Salary Deposit', date: 'Today, 10:45 AM' },
  { id: 2, type: 'outgoing' as const, amount: 85.25, description: 'Grocery Store', date: 'Yesterday, 2:30 PM' },
  { id: 3, type: 'outgoing' as const, amount: 42.50, description: 'Coffee Shop', date: 'Mar 12, 9:15 AM' },
  { id: 4, type: 'incoming' as const, amount: 500.00, description: 'Refund', date: 'Mar 10, 5:20 PM' },
  { id: 5, type: 'outgoing' as const, amount: 125.00, description: 'Internet Bill', date: 'Mar 8, 11:30 AM' },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const { user } = useAuth();
  
  const displayName = user?.userName || user?.email?.split('@')[0] || 'User';
  
  const accountBalance = user?.accountBalance?.$numberDecimal 
    ? parseFloat(user.accountBalance.$numberDecimal).toFixed(2) 
    : '0.00';
  
  return (
    <div className="min-h-screen bg-slate-50 pb-20 md:pl-64">
      <NavBar />
      
      <main className="pt-20 px-4 md:px-8 max-w-5xl mx-auto animate-fade-in">
        <div className="mb-8">
          <h2 className="text-2xl font-medium text-slate-900">Welcome back, {displayName}</h2>
          <p className="text-slate-500">Here's your financial summary</p>
        </div>
        
        <Card className="mb-6 overflow-hidden shadow-sm card-shadow bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-slate-500">Total Balance</p>
                <div className="flex items-center gap-2">
                  {isBalanceVisible ? (
                    <h3 className="text-3xl font-semibold">${accountBalance}</h3>
                  ) : (
                    <h3 className="text-3xl font-semibold">••••••</h3>
                  )}
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setIsBalanceVisible(!isBalanceVisible)}
                  >
                    {isBalanceVisible ? (
                      <EyeOff className="h-5 w-5 text-slate-500" />
                    ) : (
                      <Eye className="h-5 w-5 text-slate-500" />
                    )}
                  </Button>
                </div>
              </div>
              
              <div className="flex gap-2">
                <AnimatedButton 
                  variant="primary"
                  className="gap-2"
                  onClick={() => navigate('/deposit')}
                >
                  <ArrowDown className="h-4 w-4" />
                  Deposit
                </AnimatedButton>
                
                <AnimatedButton 
                  variant="primary"
                  className="gap-2"
                  onClick={() => navigate('/transfer')}
                >
                  <PlusCircle className="h-4 w-4" />
                  Transfer Money
                </AnimatedButton>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-fintech-blue bg-opacity-5 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-fintech-blue" />
                  <p className="text-sm font-medium">Income</p>
                </div>
                <p className="text-xl font-semibold">$1,750.00</p>
                <p className="text-xs text-slate-500 mt-1">Last 30 days</p>
              </div>
              
              <div className="bg-fintech-blue bg-opacity-5 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard className="h-5 w-5 text-fintech-blue" />
                  <p className="text-sm font-medium">Expenses</p>
                </div>
                <p className="text-xl font-semibold">$425.50</p>
                <p className="text-xs text-slate-500 mt-1">Last 30 days</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden shadow-sm card-shadow bg-white">
          <CardHeader className="p-6 pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>Transaction History</CardTitle>
              <Button variant="ghost" size="sm" className="text-fintech-blue gap-1">
                View All <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="p-6">
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="income">Income</TabsTrigger>
                <TabsTrigger value="expense">Expense</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-1 animate-slide-up">
                {transactions.map((transaction) => (
                  <TransactionItem
                    key={transaction.id}
                    type={transaction.type}
                    amount={transaction.amount}
                    description={transaction.description}
                    date={transaction.date}
                  />
                ))}
              </TabsContent>
              
              <TabsContent value="income" className="space-y-1 animate-slide-up">
                {transactions
                  .filter((transaction) => transaction.type === 'incoming')
                  .map((transaction) => (
                    <TransactionItem
                      key={transaction.id}
                      type={transaction.type}
                      amount={transaction.amount}
                      description={transaction.description}
                      date={transaction.date}
                    />
                  ))}
              </TabsContent>
              
              <TabsContent value="expense" className="space-y-1 animate-slide-up">
                {transactions
                  .filter((transaction) => transaction.type === 'outgoing')
                  .map((transaction) => (
                    <TransactionItem
                      key={transaction.id}
                      type={transaction.type}
                      amount={transaction.amount}
                      description={transaction.description}
                      date={transaction.date}
                    />
                  ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
