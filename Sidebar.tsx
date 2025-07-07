import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  Wallet, 
  Users, 
  UserPlus, 
  Plus, 
  User, 
  TrendingUp, 
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navigation = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'wallet', label: 'Wallet', icon: Wallet },
  { id: 'groups', label: 'My Groups', icon: Users },
  { id: 'create-group', label: 'Create Group', icon: Plus },
  { id: 'join-group', label: 'Join Group', icon: UserPlus },
  { id: 'credit-score', label: 'Credit Score', icon: TrendingUp },
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user, logout } = useAuth();

  return (
    <motion.div
      initial={{ width: 280 }}
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="bg-light-surface/80 dark:bg-dark-surface/80 backdrop-blur-glass border-r border-light-border dark:border-dark-border flex flex-col h-full"
    >
      {/* Header */}
      <div className="p-6 border-b border-light-border dark:border-dark-border flex items-center justify-between">
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isCollapsed ? 0 : 1 }}
          transition={{ duration: 0.2 }}
          className="flex items-center"
        >
          {!isCollapsed && (
            <div>
              <h1 className="text-lg font-bold text-lime-accent">SusuCircle</h1>
              <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">Community Savings</p>
            </div>
          )}
        </motion.div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded-full hover:bg-light-glass dark:hover:bg-dark-glass transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 text-light-text-secondary dark:text-dark-text-secondary" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-light-text-secondary dark:text-dark-text-secondary" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={`w-full flex items-center space-x-4 p-4 rounded-xl transition-all relative group ${
              activeSection === item.id
                ? 'bg-lime-accent/10 text-lime-accent'
                : 'text-light-text dark:text-dark-text hover:bg-light-glass dark:hover:bg-dark-glass hover:text-lime-accent'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className={`relative ${activeSection === item.id ? 'drop-shadow-glow' : ''}`}>
              <item.icon className="w-6 h-6" />
              {activeSection === item.id && (
                <motion.div
                  layoutId="activeGlow"
                  className="absolute inset-0 bg-lime-accent/20 rounded-full blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </div>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 1 }}
                animate={{ opacity: isCollapsed ? 0 : 1 }}
                transition={{ duration: 0.2 }}
                className="font-medium"
              >
                {item.label}
              </motion.span>
            )}
            {activeSection === item.id && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute right-0 w-1 h-8 bg-lime-accent rounded-l-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </motion.button>
        ))}
      </nav>

      {/* User Profile & Logout */}
      <div className="p-4 border-t border-light-border dark:border-dark-border space-y-3">
        {/* User Profile */}
        <div className="flex items-center space-x-3 p-3 bg-light-glass dark:bg-dark-glass rounded-xl">
          <div className="w-8 h-8 bg-lime-accent rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </span>
          </div>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: isCollapsed ? 0 : 1 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-sm font-medium text-light-text dark:text-dark-text">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                Credit Score: {user?.creditScore}
              </p>
            </motion.div>
          )}
        </div>

        {/* Logout Button */}
        <motion.button
          onClick={logout}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center space-x-3 p-3 text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
        >
          <LogOut className="w-5 h-5" />
          {!isCollapsed && <span className="text-sm font-medium">Logout</span>}
        </motion.button>
      </div>
    </motion.div>
  );
};