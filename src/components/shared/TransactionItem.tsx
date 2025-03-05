import React from 'react';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TransactionItemProps {
  type: 'deposit' | 'withdrawal' | 'transfer';
  amount: string;
  description: string;
  date: string;
  className?: string;
}

const TransactionItem = ({ type, amount, description, date, className }: TransactionItemProps) => {
  console.log("Rendering TransactionItem:", { type, amount, description, date });
  const isIncoming = type === 'deposit';
  
  return (
    <div className={cn(
      "flex items-center gap-4 p-4 rounded-lg transition-all hover:bg-slate-50 animate-in",
      className
    )}>
      <div className={cn(
        "flex items-center justify-center h-10 w-10 rounded-full",
        isIncoming ? "bg-green-100" : "bg-red-100"
      )}>
        {isIncoming ? (
          <ArrowDownLeft className="h-5 w-5 text-green-600" />
        ) : (
          <ArrowUpRight className="h-5 w-5 text-red-600" />
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <p className="font-medium text-slate-900 truncate">{description}</p>
        <p className="text-sm text-slate-500">{new Date(date).toLocaleString()}</p>
      </div>
      
      <div className={cn(
        "font-medium",
        isIncoming ? "text-green-600" : "text-red-600"
      )}>
        {isIncoming ? '+' : '-'}₦{parseFloat(amount).toFixed(2)}
      </div>
    </div>
  );
};

export default TransactionItem;
