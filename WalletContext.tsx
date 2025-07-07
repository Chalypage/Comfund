import React, { createContext, useContext, useState } from 'react';

interface WalletBalance {
  main: number;
  wallet: number;
  securityFund: number;
  lockedFunds: number;
}

interface Transaction {
  id: string;
  type: 'credit' | 'debit' | 'transfer' | 'contribution' | 'withdrawal';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  reference?: string;
}

interface WalletContextType {
  balance: WalletBalance;
  transactions: Transaction[];
  transferToMain: (amount: number) => Promise<boolean>;
  transferToWallet: (amount: number) => Promise<boolean>;
  withdraw: (amount: number) => Promise<boolean>;
  deposit: (amount: number) => Promise<boolean>;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [balance, setBalance] = useState<WalletBalance>({
    main: 25000,
    wallet: 15000,
    securityFund: 10000,
    lockedFunds: 0
  });

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'credit',
      amount: 5000,
      description: 'Group contribution received',
      date: '2024-01-20',
      status: 'completed'
    },
    {
      id: '2',
      type: 'debit',
      amount: 2000,
      description: 'Monthly contribution to Circle A',
      date: '2024-01-19',
      status: 'completed'
    },
    {
      id: '3',
      type: 'transfer',
      amount: 3000,
      description: 'Transfer from wallet to main',
      date: '2024-01-18',
      status: 'completed'
    }
  ]);

  const transferToMain = async (amount: number): Promise<boolean> => {
    if (balance.wallet >= amount) {
      setBalance(prev => ({
        ...prev,
        wallet: prev.wallet - amount,
        main: prev.main + amount
      }));
      addTransaction({
        type: 'transfer',
        amount,
        description: 'Transfer from wallet to main account',
        status: 'completed'
      });
      return true;
    }
    return false;
  };

  const transferToWallet = async (amount: number): Promise<boolean> => {
    if (balance.main >= amount) {
      setBalance(prev => ({
        ...prev,
        main: prev.main - amount,
        wallet: prev.wallet + amount
      }));
      addTransaction({
        type: 'transfer',
        amount,
        description: 'Transfer from main to wallet',
        status: 'completed'
      });
      return true;
    }
    return false;
  };

  const withdraw = async (amount: number): Promise<boolean> => {
    if (balance.main >= amount) {
      setBalance(prev => ({
        ...prev,
        main: prev.main - amount
      }));
      addTransaction({
        type: 'withdrawal',
        amount,
        description: 'Bank withdrawal',
        status: 'completed'
      });
      return true;
    }
    return false;
  };

  const deposit = async (amount: number): Promise<boolean> => {
    setBalance(prev => ({
      ...prev,
      main: prev.main + amount
    }));
    addTransaction({
      type: 'credit',
      amount,
      description: 'Bank deposit',
      status: 'completed'
    });
    return true;
  };

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'date'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0]
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  return (
    <WalletContext.Provider value={{
      balance,
      transactions,
      transferToMain,
      transferToWallet,
      withdraw,
      deposit,
      addTransaction
    }}>
      {children}
    </WalletContext.Provider>
  );
};