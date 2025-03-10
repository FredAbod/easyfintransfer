
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/shared/NavBar';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { authApi } from '@/services/authService';
import ProfileHeader from './ProfileHeader';
import BalanceCard from './BalanceCard';
import TransactionList from './TransactionList';

const Dashboard = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const { user, fetchProfile } = useAuth();
  const { toast } = useToast();
  const [profileFetched, setProfileFetched] = useState(false);
  
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

  return (
    <div className="min-h-screen bg-slate-50 pb-20 md:pl-64">
      <NavBar />
      
      <main className="pt-20 px-4 md:px-8 max-w-5xl mx-auto animate-fade-in">
        <ProfileHeader 
          displayName={displayName} 
          profilePicture={user?.profilePicture || defaultProfileImage}
        />
        
        <BalanceCard accountBalance={accountBalance} />
        
        <TransactionList transactions={transactions} />
      </main>
    </div>
  );
};

export default Dashboard;
