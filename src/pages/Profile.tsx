
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import NavBar from '@/components/shared/NavBar';
import { User, Mail, Phone, Pencil, Shield, LogOut, CreditCard, Camera, ChevronRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Profile = () => {
  const { user, logout, fetchProfile, loading } = useAuth();
  const navigate = React.useCallback(() => window.location.href = '/', []);
  const { toast } = useToast();
  const [profileFetched, setProfileFetched] = useState(false);

  // Fetch profile data when the component mounts
  useEffect(() => {
    const getProfileData = async () => {
      try {
        await fetchProfile();
        setProfileFetched(true);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load profile data. Please try again.",
          variant: "destructive",
        });
      }
    };

    if (!profileFetched) {
      getProfileData();
    }
  }, [fetchProfile, toast, profileFetched]);

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
          <Card className="lg:col-span-1 shadow-md bg-white rounded-xl border-none">
            <CardContent className="p-6 flex flex-col items-center">
              <div className="mb-4 mt-2 relative group">
                <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                  <AvatarImage src={user?.profilePicture || ""} alt="Profile" />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xl">
                    {user?.userName?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute bottom-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="icon" variant="secondary" className="rounded-full h-8 w-8 bg-white shadow-md">
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-center">{user?.userName || 'User'}</h3>
              <p className="text-slate-500 text-center mb-4">{user?.email}</p>
              
              {/* Display account balance */}
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-4 w-full mb-6 text-center">
                <p className="text-sm text-slate-600 mb-1">Account Balance</p>
                <p className="text-2xl font-semibold">₦{formattedBalance}</p>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full mb-2 border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600" 
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </CardContent>
          </Card>
          
          {/* Main Content */}
          <Card className="lg:col-span-2 shadow-md bg-white rounded-xl border-none">
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>
                Your personal information and settings
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="mb-6 w-full bg-slate-100 rounded-lg p-1">
                  <TabsTrigger value="personal" className="rounded-md flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    Personal Info
                  </TabsTrigger>
                  <TabsTrigger value="security" className="rounded-md flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    Security
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="personal">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                      <div className="flex items-center">
                        <div className="bg-blue-100 p-2 rounded-full mr-3">
                          <User className="text-blue-600 h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm text-slate-500">Username</p>
                          <p className="font-medium">{user?.userName || 'Not set'}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="rounded-full hover:bg-white">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                      <div className="flex items-center">
                        <div className="bg-blue-100 p-2 rounded-full mr-3">
                          <Mail className="text-blue-600 h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm text-slate-500">Email Address</p>
                          <p className="font-medium">{user?.email}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="rounded-full hover:bg-white">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                      <div className="flex items-center">
                        <div className="bg-blue-100 p-2 rounded-full mr-3">
                          <Phone className="text-blue-600 h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm text-slate-500">Phone Number</p>
                          <p className="font-medium">{user?.phoneNumber || 'Not set'}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="rounded-full hover:bg-white">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {user?.accountNumber && (
                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                        <div className="flex items-center">
                          <div className="bg-blue-100 p-2 rounded-full mr-3">
                            <CreditCard className="text-blue-600 h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-sm text-slate-500">Account Number</p>
                            <p className="font-medium">{user.accountNumber}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="rounded-full hover:bg-white">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="security">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                      <div className="flex items-center">
                        <div className="bg-blue-100 p-2 rounded-full mr-3">
                          <Shield className="text-blue-600 h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm text-slate-500">Password</p>
                          <p className="font-medium">••••••••</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="rounded-full hover:bg-white">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="mt-6 bg-blue-50 p-4 rounded-xl border border-blue-100">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Two-Factor Authentication</h4>
                          <p className="text-sm text-slate-600">Add an extra layer of security to your account</p>
                        </div>
                        <Button variant="outline" size="sm" className="gap-1">
                          Set Up
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
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
