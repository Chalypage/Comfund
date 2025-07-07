import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from './layout/Sidebar';
import { TopBar } from './layout/TopBar';
import { WalletOverview } from './wallet/WalletOverview';
import { GroupsOverview } from './groups/GroupsOverview';
import { TransactionHistory } from './wallet/TransactionHistory';
import { CreateGroup } from './groups/CreateGroup';
import { JoinGroup } from './groups/JoinGroup';
import { ProfileSettings } from './profile/ProfileSettings';
import { CreditScore } from './profile/CreditScore';

export const Dashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderMainContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="space-y-8">
            <WalletOverview />
            <GroupsOverview />
          </div>
        );
      case 'wallet':
        return (
          <div className="space-y-8">
            <WalletOverview />
            <TransactionHistory />
          </div>
        );
      case 'groups':
        return <GroupsOverview />;
      case 'create-group':
        return <CreateGroup />;
      case 'join-group':
        return <JoinGroup />;
      case 'profile':
        return <ProfileSettings />;
      case 'credit-score':
        return <CreditScore />;
      default:
        return <WalletOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-light-base dark:bg-dark-base text-light-text dark:text-dark-text transition-colors duration-300">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-lime-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-lime-accent/3 rounded-full blur-3xl"></div>
      </div>

      <div className="flex h-screen relative">
        {/* Sidebar */}
        <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          <TopBar />
          
          {/* Content Area */}
          <div className="flex-1 overflow-auto">
            <div className="p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {renderMainContent()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};