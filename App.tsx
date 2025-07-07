import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider } from './contexts/AuthContext';
import { UserProvider } from './contexts/UserContext';
import { WalletProvider } from './contexts/WalletContext';
import { GroupProvider } from './contexts/GroupContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { LoginScreen } from './components/auth/LoginScreen';
import { Dashboard } from './components/Dashboard';
import { useAuth } from './contexts/AuthContext';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <UserProvider>
          <WalletProvider>
            <GroupProvider>
              <AppContent />
            </GroupProvider>
          </WalletProvider>
        </UserProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-light-base dark:bg-dark-base transition-colors duration-300">
      <AnimatePresence mode="wait">
        {!isAuthenticated ? (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LoginScreen />
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Dashboard />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;