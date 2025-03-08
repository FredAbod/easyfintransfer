
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  PlusCircle, 
  EyeOff, 
  Eye, 
  TrendingUp, 
  CreditCard, 
  ChevronRight, 
  ArrowDown,
  Calendar,
  Clipboard,
  ArrowUpRight,
  ArrowDownLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import TransactionItem from '@/components/shared/TransactionItem';
import AnimatedButton from '@/components/ui/AnimatedButton';
import NavBar from '@/components/shared/NavBar';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { apiClient } from '@/services/apiUtils';
import { TransactionsResponse } from '@/services/types/transactionTypes';
import { authApi } from '@/services/authService';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const { user, fetchProfile } = useAuth();
  const { toast } = useToast();
  const [profileFetched, setProfileFetched] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isTransactionDetailsOpen, setIsTransactionDetailsOpen] = useState(false);
  
  useEffect(() => {
    // Dummy data for testing
    const dummyTransactions = [
      {
        _id: '1',
        transactionType: 'deposit',
        amount: { $numberDecimal: '2000' },
        description: 'Salary Payment',
        createdAt: '2023-10-01T10:00:00Z',
        status: 'completed',
        recipient: 'John Doe',
        accountNumber: '1234567890'
      },
      {
        _id: '2',
        transactionType: 'withdrawal',
        amount: { $numberDecimal: '500' },
        description: 'Grocery Shopping',
        createdAt: '2023-10-02T12:00:00Z',
        status: 'completed',
        recipient: 'Grocery Store',
        accountNumber: '0987654321'
      },
      {
        _id: '3',
        transactionType: 'deposit',
        amount: { $numberDecimal: '1500' },
        description: 'Client Payment',
        createdAt: '2023-10-05T15:30:00Z',
        status: 'completed',
        sender: 'ABC Company',
        accountNumber: '5678901234'
      },
    ];
    setTransactions(dummyTransactions);
  }, []);
  
  // Fetch the latest user data when the dashboard loads
  useEffect(() => {
    const getProfileData = async () => {
      try {
        await fetchProfile();
        setProfileFetched(true);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load profile data.",
          variant: "destructive",
        });
      }
    };

    if (user?._id && !profileFetched) {
      getProfileData();
    }
  }, [user?._id, fetchProfile, toast, profileFetched]);
  
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
  }, [user?._id, toast]);

  const displayName = user?.userName || user?.email?.split('@')[0] || 'User';
  
  const accountBalance = user?.accountBalance?.$numberDecimal 
    ? parseFloat(user.accountBalance.$numberDecimal).toFixed(2) 
    : '0.00';
  
  // Default profile image URL
  const defaultProfileImage = 'https://res.cloudinary.com/grazac/image/upload/v1719308203/lol_k_gprc9r.jpg';

  const handleTransactionClick = (transaction) => {
    setSelectedTransaction(transaction);
    setIsTransactionDetailsOpen(true);
  };

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
            className="w-10 h-10 rounded-full cursor-pointer shadow-md border-2 border-white"
            onClick={() => navigate('/profile')}
          />
        </div>
        
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
                  className="gap-2 rounded-xl bg-primary hover:bg-primary/90 text-white"
                  onClick={() => navigate('/transfer')}
                >
                  <PlusCircle className="h-4 w-4" />
                  Transfer Money
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/5 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <p className="text-sm font-medium">Income</p>
                </div>
                <p className="text-xl font-semibold">₦****</p>
                <p className="text-xs text-slate-500 mt-1">Last 30 days</p>
              </div>
              
              <div className="bg-gradient-to-r from-purple-500/10 to-purple-600/5 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard className="h-5 w-5 text-purple-600" />
                  <p className="text-sm font-medium">Expenses</p>
                </div>
                <p className="text-xl font-semibold">₦***</p>
                <p className="text-xs text-slate-500 mt-1">Last 30 days</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden shadow-md rounded-xl bg-white border-none">
          <CardHeader className="p-6 pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>Transaction History</CardTitle>
              <Button variant="ghost" size="sm" className="text-blue-600 gap-1">
                View All <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="p-6">
            <div className="space-y-2">
              {transactions.map((transaction) => (
                <div 
                  key={transaction._id}
                  onClick={() => handleTransactionClick(transaction)}
                  className="bg-slate-50 hover:bg-slate-100 p-4 rounded-xl cursor-pointer transition-colors duration-200"
                >
                  <div className="flex items-center">
                    <div className={`rounded-full p-2 mr-4 ${transaction.transactionType === 'deposit' ? 'bg-green-100' : 'bg-red-100'}`}>
                      {transaction.transactionType === 'deposit' ? (
                        <ArrowDownLeft className={`h-5 w-5 ${transaction.transactionType === 'deposit' ? 'text-green-600' : 'text-red-600'}`} />
                      ) : (
                        <ArrowUpRight className={`h-5 w-5 ${transaction.transactionType === 'deposit' ? 'text-green-600' : 'text-red-600'}`} />
                      )}
                    </div>
                    
                    <div className="flex-grow">
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-slate-500">{new Date(transaction.createdAt).toLocaleDateString()}</p>
                    </div>
                    
                    <div className="text-right">
                      <p className={`font-medium ${transaction.transactionType === 'deposit' ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.transactionType === 'deposit' ? '+' : '-'}₦{transaction.amount.$numberDecimal}
                      </p>
                      <p className="text-xs text-slate-500">{transaction.status}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
      
      {/* Transaction Details Dialog */}
      <Dialog open={isTransactionDetailsOpen} onOpenChange={setIsTransactionDetailsOpen}>
        <DialogContent className="max-w-md mx-auto rounded-xl">
          <DialogHeader>
            <DialogTitle>Transaction Details</DialogTitle>
            <DialogDescription>Complete information about this transaction</DialogDescription>
          </DialogHeader>
          
          {selectedTransaction && (
            <div className="space-y-4 pt-4">
              <div className="flex justify-center pb-4">
                <div className={`rounded-full p-4 ${selectedTransaction.transactionType === 'deposit' ? 'bg-green-100' : 'bg-red-100'}`}>
                  {selectedTransaction.transactionType === 'deposit' ? (
                    <ArrowDownLeft className={`h-8 w-8 ${selectedTransaction.transactionType === 'deposit' ? 'text-green-600' : 'text-red-600'}`} />
                  ) : (
                    <ArrowUpRight className={`h-8 w-8 ${selectedTransaction.transactionType === 'deposit' ? 'text-green-600' : 'text-red-600'}`} />
                  )}
                </div>
              </div>
              
              <div className="text-center pb-4">
                <p className={`text-2xl font-bold ${selectedTransaction.transactionType === 'deposit' ? 'text-green-600' : 'text-red-600'}`}>
                  {selectedTransaction.transactionType === 'deposit' ? '+' : '-'}₦{selectedTransaction.amount.$numberDecimal}
                </p>
                <p className="text-sm text-slate-500">{new Date(selectedTransaction.createdAt).toLocaleString()}</p>
              </div>
              
              <div className="bg-slate-50 p-4 rounded-lg space-y-3">
                <div className="flex justify-between">
                  <p className="text-slate-500">Description</p>
                  <p className="font-medium">{selectedTransaction.description}</p>
                </div>
                
                <div className="flex justify-between">
                  <p className="text-slate-500">Status</p>
                  <p className="font-medium capitalize">{selectedTransaction.status}</p>
                </div>
                
                <div className="flex justify-between">
                  <p className="text-slate-500">Type</p>
                  <p className="font-medium capitalize">{selectedTransaction.transactionType}</p>
                </div>
                
                {selectedTransaction.recipient && (
                  <div className="flex justify-between">
                    <p className="text-slate-500">Recipient</p>
                    <p className="font-medium">{selectedTransaction.recipient}</p>
                  </div>
                )}
                
                {selectedTransaction.sender && (
                  <div className="flex justify-between">
                    <p className="text-slate-500">Sender</p>
                    <p className="font-medium">{selectedTransaction.sender}</p>
                  </div>
                )}
                
                {selectedTransaction.accountNumber && (
                  <div className="flex justify-between">
                    <p className="text-slate-500">Account Number</p>
                    <p className="font-medium">{selectedTransaction.accountNumber}</p>
                  </div>
                )}
              </div>
              
              <div className="pt-2 flex justify-center">
                <Button variant="outline" size="sm" className="gap-2">
                  <Clipboard className="h-4 w-4" />
                  Copy Transaction ID
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
