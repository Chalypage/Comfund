import React, { createContext, useContext, useState } from 'react';

interface UserStats {
  totalContributions: number;
  completedCircles: number;
  activeGroups: number;
  emergencyFundsUsed: number;
  defaultCount: number;
  lastActivity: string;
}

interface UserContextType {
  userStats: UserStats;
  updateStats: (stats: Partial<UserStats>) => void;
  canCreateGroup: () => boolean;
  canRequestEmergency: () => boolean;
  calculateSecurityFund: (amount: number, members: number) => number;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userStats, setUserStats] = useState<UserStats>({
    totalContributions: 45000,
    completedCircles: 3,
    activeGroups: 1,
    emergencyFundsUsed: 0,
    defaultCount: 0,
    lastActivity: '2024-01-20'
  });

  const updateStats = (stats: Partial<UserStats>) => {
    setUserStats(prev => ({ ...prev, ...stats }));
  };

  const canCreateGroup = (): boolean => {
    // Credit score 85-100 can create groups
    return true; // Mock implementation
  };

  const canRequestEmergency = (): boolean => {
    // Credit score 75-100 can request emergency funds
    return true; // Mock implementation
  };

  const calculateSecurityFund = (amount: number, members: number): number => {
    return amount * members;
  };

  return (
    <UserContext.Provider value={{
      userStats,
      updateStats,
      canCreateGroup,
      canRequestEmergency,
      calculateSecurityFund
    }}>
      {children}
    </UserContext.Provider>
  );
};