import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Plus, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  TrendingUp,
  Calendar,
  Shield
} from 'lucide-react';
import { useGroup } from '../../contexts/GroupContext';
import { useAuth } from '../../contexts/AuthContext';

export const GroupsOverview: React.FC = () => {
  const { userGroups, availableGroups, requestEmergencyPosition } = useGroup();
  const { user } = useAuth();

  const handleEmergencyRequest = async (groupId: string) => {
    if (user?.creditScore && user.creditScore >= 75) {
      await requestEmergencyPosition(groupId);
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
          <h2 className="text-3xl font-bold text-light-text dark:text-dark-text">My Groups</h2>
          <p className="text-light-text-secondary dark:text-dark-text-secondary mt-1">
            Manage your savings circles and contributions
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center space-x-2 bg-lime-accent text-white px-4 py-2 rounded-xl font-medium hover:shadow-glow transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Create Group</span>
        </motion.button>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <Users className="w-8 h-8 text-lime-accent" />
            <span className="text-xs bg-lime-accent/20 text-lime-accent px-2 py-1 rounded-full">Active</span>
          </div>
          <div>
            <p className="text-2xl font-bold text-light-text dark:text-dark-text">{userGroups.length}</p>
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Active Groups</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-8 h-8 text-blue-500" />
            <span className="text-xs bg-blue-500/20 text-blue-500 px-2 py-1 rounded-full">Total</span>
          </div>
          <div>
            <p className="text-2xl font-bold text-light-text dark:text-dark-text">₦45,000</p>
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Total Contributed</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <CheckCircle className="w-8 h-8 text-orange-500" />
            <span className="text-xs bg-orange-500/20 text-orange-500 px-2 py-1 rounded-full">Completed</span>
          </div>
          <div>
            <p className="text-2xl font-bold text-light-text dark:text-dark-text">3</p>
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Circles Completed</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <Shield className="w-8 h-8 text-purple-500" />
            <span className="text-xs bg-purple-500/20 text-purple-500 px-2 py-1 rounded-full">Score</span>
          </div>
          <div>
            <p className="text-2xl font-bold text-light-text dark:text-dark-text">{user?.creditScore}</p>
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Credit Score</p>
          </div>
        </motion.div>
      </div>

      {/* Active Groups */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-light-surface/50 dark:bg-dark-surface/50 backdrop-blur-sm border border-light-border dark:border-dark-border rounded-2xl p-6"
      >
        <h3 className="text-xl font-bold text-light-text dark:text-dark-text mb-6">Active Groups</h3>
        
        <div className="space-y-4">
          {userGroups.map((group, index) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-light-glass dark:bg-dark-glass rounded-xl p-6 hover:bg-light-surface dark:hover:bg-dark-surface transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-lime-accent/20 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-lime-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-light-text dark:text-dark-text">{group.name}</h4>
                    <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                      {group.currentMembers}/{group.maxMembers} members • {group.frequency}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    group.status === 'active'
                      ? 'bg-lime-accent/20 text-lime-accent'
                      : group.status === 'recruiting'
                      ? 'bg-blue-500/20 text-blue-500'
                      : 'bg-orange-500/20 text-orange-500'
                  }`}>
                    {group.status}
                  </span>
                  {user?.creditScore && user.creditScore >= 75 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleEmergencyRequest(group.id)}
                      className="flex items-center space-x-1 bg-red-500/20 text-red-500 px-3 py-1 rounded-full text-xs font-medium hover:bg-red-500/30 transition-all"
                    >
                      <AlertTriangle className="w-3 h-3" />
                      <span>Emergency</span>
                    </motion.button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">Contribution Amount</p>
                  <p className="font-bold text-light-text dark:text-dark-text">₦{group.contributionAmount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">Security Fund Required</p>
                  <p className="font-bold text-light-text dark:text-dark-text">₦{group.securityFundRequired.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">Next Contribution</p>
                  <p className="font-bold text-light-text dark:text-dark-text flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{group.nextContributionDate}</span>
                  </p>
                </div>
                <div>
                  <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">Current Recipient</p>
                  <p className="font-bold text-light-text dark:text-dark-text">
                    {group.currentRecipient === '1' ? 'You' : 'Member #2'}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-xs text-light-text-secondary dark:text-dark-text-secondary mb-2">
                  <span>Group Progress</span>
                  <span>{Math.round((group.currentMembers / group.maxMembers) * 100)}%</span>
                </div>
                <div className="w-full bg-light-glass dark:bg-dark-glass rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(group.currentMembers / group.maxMembers) * 100}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    className="h-2 bg-lime-accent rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {userGroups.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-light-glass dark:bg-dark-glass rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-light-text-secondary dark:text-dark-text-secondary" />
            </div>
            <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
              You haven't joined any groups yet
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-lime-accent text-white px-6 py-2 rounded-xl font-medium hover:shadow-glow transition-all"
            >
              Join Your First Group
            </motion.button>
          </div>
        )}
      </motion.div>

      {/* Available Groups */}
      {availableGroups.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-light-surface/50 dark:bg-dark-surface/50 backdrop-blur-sm border border-light-border dark:border-dark-border rounded-2xl p-6"
        >
          <h3 className="text-xl font-bold text-light-text dark:text-dark-text mb-6">Available Groups</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableGroups.slice(0, 4).map((group, index) => (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-light-glass dark:bg-dark-glass rounded-xl p-4 hover:bg-light-surface dark:hover:bg-dark-surface transition-all border border-light-border dark:border-dark-border hover:border-lime-accent/30"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-light-text dark:text-dark-text">{group.name}</h4>
                  <span className="text-xs bg-blue-500/20 text-blue-500 px-2 py-1 rounded-full">
                    {group.currentMembers}/{group.maxMembers}
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-light-text-secondary dark:text-dark-text-secondary">Amount:</span>
                    <span className="text-light-text dark:text-dark-text font-medium">₦{group.contributionAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-light-text-secondary dark:text-dark-text-secondary">Frequency:</span>
                    <span className="text-light-text dark:text-dark-text font-medium capitalize">{group.frequency}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-light-text-secondary dark:text-dark-text-secondary">Security Fund:</span>
                    <span className="text-light-text dark:text-dark-text font-medium">₦{group.securityFundRequired.toLocaleString()}</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-lime-accent text-white py-2 rounded-lg font-medium hover:shadow-glow transition-all"
                >
                  Join Group (₦1,000 fee)
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};