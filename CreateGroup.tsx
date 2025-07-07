import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, DollarSign, Shield, Plus, ArrowLeft } from 'lucide-react';
import { useGroup } from '../../contexts/GroupContext';
import { useAuth } from '../../contexts/AuthContext';

export const CreateGroup: React.FC = () => {
  const { createGroup } = useGroup();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const [groupData, setGroupData] = useState({
    name: '',
    contributionAmount: 5000,
    frequency: 'monthly' as 'daily' | 'weekly' | 'monthly',
    maxMembers: 10,
    description: '',
    autoAddMembers: true
  });

  const canCreateGroup = user?.creditScore && user.creditScore >= 85;
  const securityFundRequired = groupData.contributionAmount * groupData.maxMembers;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canCreateGroup) return;

    setLoading(true);
    try {
      await createGroup({
        ...groupData,
        securityFundRequired
      });
      // Reset form or redirect
      setGroupData({
        name: '',
        contributionAmount: 5000,
        frequency: 'monthly',
        maxMembers: 10,
        description: '',
        autoAddMembers: true
      });
    } catch (error) {
      console.error('Failed to create group:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!canCreateGroup) {
    return (
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center py-12"
        >
          <div className="w-20 h-20 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-orange-500" />
          </div>
          <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-4">
            Credit Score Requirement Not Met
          </h2>
          <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6 max-w-md mx-auto">
            You need a credit score of 85-100 to create groups. Your current score is {user?.creditScore}.
            Participate in more groups to improve your score.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-lime-accent text-white px-6 py-3 rounded-xl font-medium hover:shadow-glow transition-all"
          >
            View Available Groups
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center space-x-4"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 bg-light-glass dark:bg-dark-glass rounded-full hover:bg-lime-accent/10 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-light-text dark:text-dark-text" />
        </motion.button>
        <div>
          <h2 className="text-3xl font-bold text-light-text dark:text-dark-text">Create New Group</h2>
          <p className="text-light-text-secondary dark:text-dark-text-secondary mt-1">
            Set up a new savings circle for your community
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-light-surface/50 dark:bg-dark-surface/50 backdrop-blur-sm border border-light-border dark:border-dark-border rounded-2xl p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Group Name */}
              <div>
                <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                  Group Name
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary" />
                  <input
                    type="text"
                    value={groupData.name}
                    onChange={(e) => setGroupData({ ...groupData, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border rounded-xl focus:outline-none focus:border-lime-accent/50 text-light-text dark:text-dark-text"
                    placeholder="Enter group name"
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                  Description (Optional)
                </label>
                <textarea
                  value={groupData.description}
                  onChange={(e) => setGroupData({ ...groupData, description: e.target.value })}
                  className="w-full px-4 py-3 bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border rounded-xl focus:outline-none focus:border-lime-accent/50 text-light-text dark:text-dark-text resize-none"
                  rows={3}
                  placeholder="Describe the purpose of this group..."
                />
              </div>

              {/* Contribution Amount */}
              <div>
                <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                  Contribution Amount (₦)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary" />
                  <input
                    type="number"
                    min="1000"
                    max="100000"
                    step="1000"
                    value={groupData.contributionAmount}
                    onChange={(e) => setGroupData({ ...groupData, contributionAmount: parseInt(e.target.value) })}
                    className="w-full pl-10 pr-4 py-3 bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border rounded-xl focus:outline-none focus:border-lime-accent/50 text-light-text dark:text-dark-text"
                    required
                  />
                </div>
                <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary mt-1">
                  Minimum: ₦1,000 • Maximum based on your credit score
                </p>
              </div>

              {/* Frequency and Members */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                    Contribution Frequency
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary" />
                    <select
                      value={groupData.frequency}
                      onChange={(e) => setGroupData({ ...groupData, frequency: e.target.value as 'daily' | 'weekly' | 'monthly' })}
                      className="w-full pl-10 pr-4 py-3 bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border rounded-xl focus:outline-none focus:border-lime-accent/50 text-light-text dark:text-dark-text appearance-none"
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                    Maximum Members
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary" />
                    <select
                      value={groupData.maxMembers}
                      onChange={(e) => setGroupData({ ...groupData, maxMembers: parseInt(e.target.value) })}
                      className="w-full pl-10 pr-4 py-3 bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border rounded-xl focus:outline-none focus:border-lime-accent/50 text-light-text dark:text-dark-text appearance-none"
                    >
                      <option value={5}>5 Members</option>
                      <option value={10}>10 Members</option>
                      <option value={15}>15 Members</option>
                      <option value={20}>20 Members</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Auto Add Members */}
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="autoAdd"
                  checked={groupData.autoAddMembers}
                  onChange={(e) => setGroupData({ ...groupData, autoAddMembers: e.target.checked })}
                  className="w-4 h-4 text-lime-accent bg-light-glass dark:bg-dark-glass border-light-border dark:border-dark-border rounded focus:ring-lime-accent"
                />
                <label htmlFor="autoAdd" className="text-sm text-light-text dark:text-dark-text">
                  Allow system to automatically add members based on preferences
                </label>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full bg-lime-accent text-white py-3 rounded-xl font-medium hover:shadow-glow transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>{loading ? 'Creating Group...' : 'Create Group'}</span>
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Summary */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-light-surface/50 dark:bg-dark-surface/50 backdrop-blur-sm border border-light-border dark:border-dark-border rounded-2xl p-6 sticky top-8"
          >
            <h3 className="text-lg font-bold text-light-text dark:text-dark-text mb-4">Group Summary</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-light-text-secondary dark:text-dark-text-secondary">Group Name:</span>
                <span className="text-light-text dark:text-dark-text font-medium">
                  {groupData.name || 'Not set'}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-light-text-secondary dark:text-dark-text-secondary">Contribution:</span>
                <span className="text-light-text dark:text-dark-text font-medium">
                  ₦{groupData.contributionAmount.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-light-text-secondary dark:text-dark-text-secondary">Frequency:</span>
                <span className="text-light-text dark:text-dark-text font-medium capitalize">
                  {groupData.frequency}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-light-text-secondary dark:text-dark-text-secondary">Max Members:</span>
                <span className="text-light-text dark:text-dark-text font-medium">
                  {groupData.maxMembers}
                </span>
              </div>

              <div className="border-t border-light-border dark:border-dark-border pt-4">
                <div className="flex justify-between">
                  <span className="text-light-text-secondary dark:text-dark-text-secondary">Security Fund Required:</span>
                  <span className="text-lime-accent font-bold">
                    ₦{securityFundRequired.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="bg-lime-accent/10 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-lime-accent mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-lime-accent">Security Fund</p>
                    <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary mt-1">
                      You'll need to maintain 100% security fund (₦{securityFundRequired.toLocaleString()}) to create this group.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Users className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-500">Member Management</p>
                    <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary mt-1">
                      As group creator, you can add, modify, or remove members until the group becomes active.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};