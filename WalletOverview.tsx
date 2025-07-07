import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Wallet, 
  CreditCard, 
  Shield, 
  Lock, 
  ArrowUpRight, 
  ArrowDownLeft, 
  RefreshCw,
  Eye,
  EyeOff
} from 'lucide-react';
import { useWallet } from '../../contexts/WalletContext';

export const WalletOverview: React.FC = () => {
  const { balance, transferToMain, transferToWallet } = useWallet();
  const [showBalances, setShowBalances] = useState(true);
  const [transferAmount, setTransferAmount] = useState('');
  const [transferDirection, setTransferDirection] = useState<'toMain' | 'toWallet'>('toMain');

  const handleTransfer = async () => {
    const amount = parseFloat(transferAmount);
    if (amount > 0) {
      if (transferDirection === 'toMain') {
        await transferToMain(amount);
      } else {
        await transferToWallet(amount);
      }
      setTransferAmount('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-3xl font-bold text-light-text dark:text-dark-text">Wallet Overview</h2>
          <p className="text-light-text-secondary dark:text-dark-text-secondary mt-1">
            Manage your funds across accounts
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowBalances(!showBalances)}
          className="p-3 bg-light-glass dark:bg-dark-glass rounded-full hover:bg-lime-accent/10 transition-colors"
        >
          {showBalances ? (
            <Eye className="w-5 h-5 text-light-text dark:text-dark-text" />
          ) : (
            <EyeOff className="w-5 h-5 text-light-text dark:text-dark-text" />
          )}
        </motion.button>
      </motion.div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Main Account */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-gradient-to-br from-lime-accent to-lime-accent/80 rounded-xl p-6 text-white shadow-glow"
        >
          <div className="flex items-center justify-between mb-4">
            <CreditCard className="w-8 h-8" />
            <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Main</span>
          </div>
          <div>
            <p className="text-white/80 text-sm">Main Account</p>
            <p className="text-2xl font-bold">
              {showBalances ? `₦${balance.main.toLocaleString()}` : '••••••••'}
            </p>
            <p className="text-white/60 text-xs mt-1">Available for withdrawal</p>
          </div>
        </motion.div>

        {/* Wallet Account */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-xl p-6 hover:border-lime-accent/30 transition-all"
        >
          <div className="flex items-center justify-between mb-4">
            <Wallet className="w-8 h-8 text-blue-500" />
            <span className="text-xs bg-blue-500/20 text-blue-500 px-2 py-1 rounded-full">Wallet</span>
          </div>
          <div>
            <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm">Wallet Balance</p>
            <p className="text-2xl font-bold text-light-text dark:text-dark-text">
              {showBalances ? `₦${balance.wallet.toLocaleString()}` : '••••••••'}
            </p>
            <p className="text-light-text-secondary dark:text-dark-text-secondary text-xs mt-1">
              For group contributions
            </p>
          </div>
        </motion.div>

        {/* Security Fund */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-xl p-6 hover:border-lime-accent/30 transition-all"
        >
          <div className="flex items-center justify-between mb-4">
            <Shield className="w-8 h-8 text-orange-500" />
            <span className="text-xs bg-orange-500/20 text-orange-500 px-2 py-1 rounded-full">Security</span>
          </div>
          <div>
            <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm">Security Fund</p>
            <p className="text-2xl font-bold text-light-text dark:text-dark-text">
              {showBalances ? `₦${balance.securityFund.toLocaleString()}` : '••••••••'}
            </p>
            <p className="text-light-text-secondary dark:text-dark-text-secondary text-xs mt-1">
              Backup protection
            </p>
          </div>
        </motion.div>

        {/* Locked Funds */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-xl p-6 hover:border-lime-accent/30 transition-all"
        >
          <div className="flex items-center justify-between mb-4">
            <Lock className="w-8 h-8 text-red-500" />
            <span className="text-xs bg-red-500/20 text-red-500 px-2 py-1 rounded-full">Locked</span>
          </div>
          <div>
            <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm">Locked Funds</p>
            <p className="text-2xl font-bold text-light-text dark:text-dark-text">
              {showBalances ? `₦${balance.lockedFunds.toLocaleString()}` : '••••••••'}
            </p>
            <p className="text-light-text-secondary dark:text-dark-text-secondary text-xs mt-1">
              Emergency fund used
            </p>
          </div>
        </motion.div>
      </div>

      {/* Quick Transfer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-light-surface/50 dark:bg-dark-surface/50 backdrop-blur-sm border border-light-border dark:border-dark-border rounded-2xl p-6"
      >
        <h3 className="text-xl font-bold text-light-text dark:text-dark-text mb-4">Quick Transfer</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-sm text-light-text-secondary dark:text-dark-text-secondary mb-2">
              Transfer Direction
            </label>
            <select
              value={transferDirection}
              onChange={(e) => setTransferDirection(e.target.value as 'toMain' | 'toWallet')}
              className="w-full bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border rounded-xl px-3 py-2 text-light-text dark:text-dark-text focus:outline-none focus:border-lime-accent/50"
            >
              <option value="toMain">Wallet → Main</option>
              <option value="toWallet">Main → Wallet</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-light-text-secondary dark:text-dark-text-secondary mb-2">
              Amount (₦)
            </label>
            <input
              type="number"
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border rounded-xl px-3 py-2 text-light-text dark:text-dark-text focus:outline-none focus:border-lime-accent/50"
            />
          </div>

          <div>
            <label className="block text-sm text-light-text-secondary dark:text-dark-text-secondary mb-2">
              Available Balance
            </label>
            <p className="text-sm text-light-text dark:text-dark-text bg-light-glass dark:bg-dark-glass rounded-xl px-3 py-2">
              ₦{transferDirection === 'toMain' ? balance.wallet.toLocaleString() : balance.main.toLocaleString()}
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleTransfer}
            disabled={!transferAmount || parseFloat(transferAmount) <= 0}
            className="bg-lime-accent text-white px-6 py-3 rounded-xl font-medium hover:shadow-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {transferDirection === 'toMain' ? (
              <ArrowUpRight className="w-5 h-5" />
            ) : (
              <ArrowDownLeft className="w-5 h-5" />
            )}
            <span>Transfer</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border rounded-xl p-4 hover:border-lime-accent/30 transition-all flex items-center space-x-3"
        >
          <div className="w-10 h-10 bg-lime-accent/20 rounded-full flex items-center justify-center">
            <ArrowDownLeft className="w-5 h-5 text-lime-accent" />
          </div>
          <div className="text-left">
            <p className="font-medium text-light-text dark:text-dark-text">Deposit Funds</p>
            <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
              Add money to your account
            </p>
          </div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border rounded-xl p-4 hover:border-lime-accent/30 transition-all flex items-center space-x-3"
        >
          <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
            <ArrowUpRight className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-left">
            <p className="font-medium text-light-text dark:text-dark-text">Withdraw</p>
            <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
              Transfer to bank account
            </p>
          </div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border rounded-xl p-4 hover:border-lime-accent/30 transition-all flex items-center space-x-3"
        >
          <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center">
            <RefreshCw className="w-5 h-5 text-orange-500" />
          </div>
          <div className="text-left">
            <p className="font-medium text-light-text dark:text-dark-text">Transaction History</p>
            <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
              View all transactions
            </p>
          </div>
        </motion.button>
      </div>
    </div>
  );
};