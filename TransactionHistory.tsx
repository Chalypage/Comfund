import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  RefreshCw, 
  Filter,
  Search,
  Calendar,
  Download
} from 'lucide-react';
import { useWallet } from '../../contexts/WalletContext';

export const TransactionHistory: React.FC = () => {
  const { transactions } = useWallet();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTransactions = transactions.filter(transaction => {
    const matchesFilter = filter === 'all' || transaction.type === filter;
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'credit':
        return <ArrowDownLeft className="w-5 h-5 text-lime-accent" />;
      case 'debit':
      case 'withdrawal':
        return <ArrowUpRight className="w-5 h-5 text-red-400" />;
      case 'transfer':
        return <RefreshCw className="w-5 h-5 text-blue-500" />;
      default:
        return <RefreshCw className="w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary" />;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'credit':
        return 'text-lime-accent';
      case 'debit':
      case 'withdrawal':
        return 'text-red-400';
      case 'transfer':
        return 'text-blue-500';
      default:
        return 'text-light-text dark:text-dark-text';
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
          <h2 className="text-3xl font-bold text-light-text dark:text-dark-text">Transaction History</h2>
          <p className="text-light-text-secondary dark:text-dark-text-secondary mt-1">
            Track all your financial activities
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center space-x-2 bg-lime-accent text-white px-4 py-2 rounded-xl font-medium hover:shadow-glow transition-all"
        >
          <Download className="w-4 h-4" />
          <span>Export</span>
        </motion.button>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-light-surface/50 dark:bg-dark-surface/50 backdrop-blur-sm border border-light-border dark:border-dark-border rounded-2xl p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search transactions..."
              className="w-full pl-10 pr-4 py-2 bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border rounded-xl focus:outline-none focus:border-lime-accent/50 text-light-text dark:text-dark-text"
            />
          </div>

          {/* Type Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border rounded-xl focus:outline-none focus:border-lime-accent/50 text-light-text dark:text-dark-text appearance-none"
            >
              <option value="all">All Types</option>
              <option value="credit">Credits</option>
              <option value="debit">Debits</option>
              <option value="transfer">Transfers</option>
              <option value="withdrawal">Withdrawals</option>
            </select>
          </div>

          {/* Date Range */}
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary" />
            <input
              type="date"
              className="w-full pl-10 pr-4 py-2 bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border rounded-xl focus:outline-none focus:border-lime-accent/50 text-light-text dark:text-dark-text"
            />
          </div>

          {/* Status Filter */}
          <select className="w-full px-4 py-2 bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border rounded-xl focus:outline-none focus:border-lime-accent/50 text-light-text dark:text-dark-text">
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </motion.div>

      {/* Transaction List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-light-surface/50 dark:bg-dark-surface/50 backdrop-blur-sm border border-light-border dark:border-dark-border rounded-2xl overflow-hidden"
      >
        <div className="p-6 border-b border-light-border dark:border-dark-border">
          <h3 className="text-lg font-bold text-light-text dark:text-dark-text">
            Recent Transactions ({filteredTransactions.length})
          </h3>
        </div>

        <div className="divide-y divide-light-border dark:divide-dark-border">
          {filteredTransactions.map((transaction, index) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="p-6 hover:bg-light-glass dark:hover:bg-dark-glass transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Transaction Icon */}
                  <div className="w-12 h-12 bg-light-glass dark:bg-dark-glass rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    {getTransactionIcon(transaction.type)}
                  </div>

                  {/* Transaction Details */}
                  <div>
                    <p className="font-medium text-light-text dark:text-dark-text">
                      {transaction.description}
                    </p>
                    <div className="flex items-center space-x-3 mt-1">
                      <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                        {transaction.date}
                      </p>
                      <span className="text-light-text-secondary dark:text-dark-text-secondary">•</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        transaction.status === 'completed'
                          ? 'bg-lime-accent/20 text-lime-accent'
                          : transaction.status === 'pending'
                          ? 'bg-orange-500/20 text-orange-500'
                          : 'bg-red-500/20 text-red-500'
                      }`}>
                        {transaction.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Amount */}
                <div className="text-right">
                  <p className={`text-lg font-bold ${getTransactionColor(transaction.type)}`}>
                    {transaction.type === 'credit' ? '+' : '-'}₦{Math.abs(transaction.amount).toLocaleString()}
                  </p>
                  {transaction.reference && (
                    <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary mt-1">
                      Ref: {transaction.reference}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredTransactions.length === 0 && (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-light-glass dark:bg-dark-glass rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-light-text-secondary dark:text-dark-text-secondary" />
            </div>
            <p className="text-light-text-secondary dark:text-dark-text-secondary">
              No transactions found matching your criteria
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};