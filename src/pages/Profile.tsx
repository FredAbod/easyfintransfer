
import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import NavBar from '@/components/shared/NavBar';
import { User, Mail, Phone, Pencil, Shield, LogOut, CreditCard } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Profile = () => {
  const { user, logout, fetchProfile, loading } = useAuth();
  const navigate = React.useCallback(() => window.location.href = '/', []);
  const { toast } = useToast();

  // Fetch profile data when the component mounts
  useEffect(() => {
    const getProfileData = async () => {
      try {
        await fetchProfile();
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load profile data. Please try again.",
          variant: "destructive",
        });
      }
    };

    getProfileData();
  }, [fetchProfile, toast]);

  const handleLogout = () => {
    logout();
    navigate();
  };

  // Format the account balance for display
  const formattedBalance = user?.accountBalance?.$numberDecimal 
    ? parseFloat(user.accountBalance.$numberDecimal).toFixed(2) 
    : '0.00';

  return (
    <div className="min-h-screen bg-slate-50 pb-20 md:pl-64">
      <NavBar />
      
      <main className="pt-20 px-4 md:px-8 max-w-5xl mx-auto animate-fade-in">
        <div className="mb-8">
          <h2 className="text-2xl font-medium text-slate-900">Your Profile</h2>
          <p className="text-slate-500">Manage your account details and preferences</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="lg:col-span-1 shadow-sm bg-white">
            <CardContent className="p-6 flex flex-col items-center">
              <div className="mb-4 mt-2">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="" alt="Profile" />
                  <AvatarFallback className="bg-fintech-blue text-white text-xl">
                    {user?.userName?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
              </div>
              
              <h3 className="text-xl font-semibold text-center">{user?.userName || 'User'}</h3>
              <p className="text-slate-500 text-center mb-4">{user?.email}</p>
              
              {/* Display account balance */}
              <div className="bg-fintech-blue bg-opacity-5 rounded-lg p-4 w-full mb-4 text-center">
                <p className="text-sm text-slate-600 mb-1">Account Balance</p>
                <p className="text-2xl font-semibold">${formattedBalance}</p>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full mb-2" 
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </CardContent>
          </Card>
          
          {/* Main Content */}
          <Card className="lg:col-span-2 shadow-sm bg-white">
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>
                Your personal information and settings
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="mb-4 w-full">
                  <TabsTrigger value="personal" className="flex-1">Personal Info</TabsTrigger>
                  <TabsTrigger value="security" className="flex-1">Security</TabsTrigger>
                </TabsList>
                
                <TabsContent value="personal">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-md">
                      <div className="flex items-center">
                        <User className="text-slate-500 mr-3 h-5 w-5" />
                        <div>
                          <p className="text-sm text-slate-500">Username</p>
                          <p className="font-medium">{user?.userName || 'Not set'}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-md">
                      <div className="flex items-center">
                        <Mail className="text-slate-500 mr-3 h-5 w-5" />
                        <div>
                          <p className="text-sm text-slate-500">Email Address</p>
                          <p className="font-medium">{user?.email}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-md">
                      <div className="flex items-center">
                        <Phone className="text-slate-500 mr-3 h-5 w-5" />
                        <div>
                          <p className="text-sm text-slate-500">Phone Number</p>
                          <p className="font-medium">{user?.phoneNumber || 'Not set'}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {user?.accountNumber && (
                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-md">
                        <div className="flex items-center">
                          <CreditCard className="text-slate-500 mr-3 h-5 w-5" />
                          <div>
                            <p className="text-sm text-slate-500">Account Number</p>
                            <p className="font-medium">{user.accountNumber}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="security">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-md">
                      <div className="flex items-center">
                        <Shield className="text-slate-500 mr-3 h-5 w-5" />
                        <div>
                          <p className="text-sm text-slate-500">Password</p>
                          <p className="font-medium">••••••••</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Profile;
