import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle, EyeOff, Eye, TrendingUp, CreditCard, ChevronRight, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TransactionItem from '@/components/shared/TransactionItem';
import AnimatedButton from '@/components/ui/AnimatedButton';
import NavBar from '@/components/shared/NavBar';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { apiClient } from '@/services/apiUtils'; // Import the apiClient
import { TransactionsResponse } from '@/services/types/transactionTypes'; // Import the types
import { authApi } from '@/services/authService'; // Import the authApi

const Dashboard = () => {
  const navigate = useNavigate();
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const { user, fetchProfile } = useAuth();
  const { toast } = useToast();
  
  useEffect(() => {
    // Dummy data for testing
    const dummyTransactions = [
      {
        _id: '1',
        transactionType: 'deposit',
        amount: { $numberDecimal: '2000' },
        description: 'Salary Payment',
        createdAt: '2023-10-01T10:00:00Z',
      },
      {
        _id: '2',
        transactionType: 'withdrawal',
        amount: { $numberDecimal: '500' },
        description: 'Grocery Shopping',
        createdAt: '2023-10-02T12:00:00Z',
      },
    ];
    setTransactions(dummyTransactions);
  }, []);
  
  // Fetch the latest user data when the dashboard loads
  useEffect(() => {
    const getProfileData = async () => {
      try {
        await fetchProfile();
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load profile data.",
          variant: "destructive",
        });
      }
    };

    getProfileData();
  }, []);
  
  // Fetch transaction history
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        if (!user?._id) {
          throw new Error("User ID is not available");
        }
        const transactionsData = await authApi.getUserTransactions(user._id, 1, 10);
        if (transactionsData && transactionsData.data && transactionsData.data.transactions) {
          console.log("Setting transactions:", transactionsData.data.transactions);
          setTransactions(transactionsData.data.transactions);
        } else {
          throw new Error("Invalid response structure");
        }
      } catch (error) {
        toast({
          title: "Error",
          description: error.message || "Failed to load transactions.",
          variant: "destructive",
        });
      }
    };

    if (user?._id) {
      fetchTransactions();
    }
  }, [user?._id]);

  const displayName = user?.userName || user?.email?.split('@')[0] || 'User';
  
  const accountBalance = user?.accountBalance?.$numberDecimal 
    ? parseFloat(user.accountBalance.$numberDecimal).toFixed(2) 
    : '0.00';
  
  // Default profile image URL
  const defaultProfileImage = 'https://res.cloudinary.com/grazac/image/upload/v1719308203/lol_k_gprc9r.jpg';

  return (
    <div className="min-h-screen bg-slate-50 pb-20 md:pl-64">
      <NavBar />
      
      <main className="pt-20 px-4 md:px-8 max-w-5xl mx-auto animate-fade-in">
        <div className="mb-8 flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-2xl font-medium text-slate-900">Welcome back, {displayName}</h2>
            <p className="text-slate-500">Here's your financial summary</p>
          </div>
          <img
            src={user?.profilePicture || defaultProfileImage}
            alt="Profile"
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={() => navigate('/profile')}
          />
        </div>
        
        <Card className="mb-6 overflow-hidden shadow-sm card-shadow bg-white">
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-fintech-blue bg-opacity-5 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-fintech-blue" />
                  <p className="text-sm font-medium">Income</p>
                </div>
                <p className="text-xl font-semibold">₦****</p>
                <p className="text-xs text-slate-500 mt-1">Last 30 days</p>
              </div>
              
              <div className="bg-fintech-blue bg-opacity-5 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard className="h-5 w-5 text-fintech-blue" />
                  <p className="text-sm font-medium">Expenses</p>
                </div>
                <p className="text-xl font-semibold">₦***</p>
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
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {transactions.map((transaction) => (
                    <tr key={transaction._id}>
                      <td className="px-4 py-2 whitespace-nowrap">{transaction.description}</td>
                      <td className="px-4 py-2 whitespace-nowrap">₦{transaction.amount.$numberDecimal}</td>
                      <td className="px-4 py-2 whitespace-nowrap">{transaction.transactionType}</td>
                      <td className="px-4 py-2 whitespace-nowrap">{new Date(transaction.createdAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
