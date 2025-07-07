import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Shield, Verified } from 'lucide-react';
import { ThemeToggle } from '../ThemeToggle';
import { useAuth } from '../../contexts/AuthContext';

export const TopBar: React.FC = () => {
  const { user } = useAuth();

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-light-surface/80 dark:bg-dark-surface/80 backdrop-blur-glass border-b border-light-border dark:border-dark-border px-8 py-4 flex items-center justify-between sticky top-0 z-50"
    >
      {/* Left section */}
      <div className="flex items-center space-x-6">
        <div>
          <h2 className="text-xl font-bold text-light-text dark:text-dark-text">
            Welcome back, {user?.firstName}!
          </h2>
          <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
            Manage your savings circles and grow your wealth
          </p>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center space-x-6">
        {/* Theme Toggle */}
        <ThemeToggle />
        
        {/* Verification Status */}
        <div className="flex items-center space-x-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`flex items-center space-x-2 px-3 py-2 rounded-full ${
              user?.kycStatus === 'verified'
                ? 'bg-lime-accent/20 text-lime-accent'
                : 'bg-orange-500/20 text-orange-500'
            }`}
          >
            {user?.kycStatus === 'verified' ? (
              <Verified className="w-4 h-4" />
            ) : (
              <Shield className="w-4 h-4" />
            )}
            <span className="text-xs font-medium">
              {user?.kycStatus === 'verified' ? 'Verified' : 'Pending KYC'}
            </span>
          </motion.div>

          {/* Credit Score Badge */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 bg-light-glass dark:bg-dark-glass px-3 py-2 rounded-full"
          >
            <div className="w-2 h-2 bg-lime-accent rounded-full"></div>
            <span className="text-xs text-light-text dark:text-dark-text font-medium">
              Score: {user?.creditScore}
            </span>
          </motion.div>
        </div>

        {/* Notifications */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-2 bg-light-glass dark:bg-dark-glass rounded-full hover:bg-lime-accent/10 transition-colors"
        >
          <Bell className="w-5 h-5 text-light-text dark:text-dark-text" />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-3 h-3 bg-lime-accent rounded-full"
          />
        </motion.button>

        {/* User avatar */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="w-10 h-10 bg-lime-accent rounded-full flex items-center justify-center cursor-pointer shadow-glow"
        >
          <span className="text-white font-bold text-sm">
            {user?.firstName?.[0]}{user?.lastName?.[0]}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
};