
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, ArrowDownLeft, ArrowUpRight } from 'lucide-react';

interface Transaction {
  _id: string;
  transactionType: string;
  amount: {
    $numberDecimal: string;
  };
  description: string;
  createdAt: string;
  status: string;
  recipient?: string;
  sender?: string;
  accountNumber?: string;
}

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList = ({ transactions }: TransactionListProps) => {
  return (
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
              className="bg-slate-50 p-4 rounded-xl transition-colors duration-200"
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
  );
};

export default TransactionList;
