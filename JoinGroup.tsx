import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Search, 
  Filter, 
  Calendar, 
  DollarSign, 
  Shield,
  Clock,
  CheckCircle,
  ArrowLeft
} from 'lucide-react';
import { useGroup } from '../../contexts/GroupContext';

export const JoinGroup: React.FC = () => {
  const { availableGroups, joinGroup } = useGroup();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterFrequency, setFilterFrequency] = useState('all');
  const [filterAmount, setFilterAmount] = useState('all');
  const [loading, setLoading] = useState<string | null>(null);

  const filteredGroups = availableGroups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFrequency = filterFrequency === 'all' || group.frequency === filterFrequency;
    const matchesAmount = filterAmount === 'all' || 
      (filterAmount === 'low' && group.contributionAmount <= 5000) ||
      (filterAmount === 'medium' && group.contributionAmount > 5000 && group.contributionAmount <= 15000) ||
      (filterAmount === 'high' && group.contributionAmount > 15000);
    
    return matchesSearch && matchesFrequency && matchesAmount;
  });

  const handleJoinGroup = async (groupId: string) => {
    setLoading(groupId);
    try {
      await joinGroup(groupId);
    } catch (error) {
      console.error('Failed to join group:', error);
    } finally {
      setLoading(null);
    }
  };

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
          <h2 className="text-3xl font-bold text-light-text dark:text-dark-text">Join a Group</h2>
          <p className="text-light-text-secondary dark:text-dark-text-secondary mt-1">
            Find and join savings circles that match your goals
          </p>
        </div>
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
              placeholder="Search groups..."
              className="w-full pl-10 pr-4 py-2 bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border rounded-xl focus:outline-none focus:border-lime-accent/50 text-light-text dark:text-dark-text"
            />
          </div>

          {/* Frequency Filter */}
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary" />
            <select
              value={filterFrequency}
              onChange={(e) => setFilterFrequency(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border rounded-xl focus:outline-none focus:border-lime-accent/50 text-light-text dark:text-dark-text appearance-none"
            >
              <option value="all">All Frequencies</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          {/* Amount Filter */}
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary" />
            <select
              value={filterAmount}
              onChange={(e) => setFilterAmount(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border rounded-xl focus:outline-none focus:border-lime-accent/50 text-light-text dark:text-dark-text appearance-none"
            >
              <option value="all">All Amounts</option>
              <option value="low">₦1K - ₦5K</option>
              <option value="medium">₦5K - ₦15K</option>
              <option value="high">₦15K+</option>
            </select>
          </div>

          {/* Clear Filters */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setSearchTerm('');
              setFilterFrequency('all');
              setFilterAmount('all');
            }}
            className="flex items-center justify-center space-x-2 bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border rounded-xl px-4 py-2 hover:border-lime-accent/30 transition-all"
          >
            <Filter className="w-4 h-4 text-light-text-secondary dark:text-dark-text-secondary" />
            <span className="text-sm text-light-text dark:text-dark-text">Clear</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Groups Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredGroups.map((group, index) => (
          <motion.div
            key={group.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-light-surface/50 dark:bg-dark-surface/50 backdrop-blur-sm border border-light-border dark:border-dark-border rounded-2xl p-6 hover:border-lime-accent/30 transition-all hover:shadow-glow"
          >
            {/* Group Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-lime-accent/20 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-lime-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-light-text dark:text-dark-text">{group.name}</h3>
                  <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                    Created by Member #{group.createdBy}
                  </p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                group.status === 'recruiting'
                  ? 'bg-blue-500/20 text-blue-500'
                  : 'bg-lime-accent/20 text-lime-accent'
              }`}>
                {group.status}
              </span>
            </div>

            {/* Group Details */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Contribution:</span>
                <span className="font-bold text-light-text dark:text-dark-text">
                  ₦{group.contributionAmount.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Frequency:</span>
                <span className="font-medium text-light-text dark:text-dark-text capitalize">
                  {group.frequency}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Members:</span>
                <span className="font-medium text-light-text dark:text-dark-text">
                  {group.currentMembers}/{group.maxMembers}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Security Fund:</span>
                <span className="font-bold text-orange-500">
                  ₦{group.securityFundRequired.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Next Start:</span>
                <span className="font-medium text-light-text dark:text-dark-text flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{group.nextContributionDate}</span>
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
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

            {/* Join Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleJoinGroup(group.id)}
              disabled={loading === group.id}
              className="w-full bg-lime-accent text-white py-3 rounded-xl font-medium hover:shadow-glow transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              {loading === group.id ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Joining...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>Join Group (₦1,000 fee)</span>
                </>
              )}
            </motion.button>

            {/* Requirements */}
            <div className="mt-4 p-3 bg-orange-500/10 rounded-lg">
              <div className="flex items-start space-x-2">
                <Shield className="w-4 h-4 text-orange-500 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-orange-500">Requirements:</p>
                  <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                    • ₦1,000 joining fee<br/>
                    • {Math.round(group.securityFundRequired * 0.5).toLocaleString()} - {group.securityFundRequired.toLocaleString()} security fund<br/>
                    • Verified KYC status
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {filteredGroups.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center py-12"
        >
          <div className="w-16 h-16 bg-light-glass dark:bg-dark-glass rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-light-text-secondary dark:text-dark-text-secondary" />
          </div>
          <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
            No groups found matching your criteria
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-lime-accent text-white px-6 py-2 rounded-xl font-medium hover:shadow-glow transition-all"
          >
            Create Your Own Group
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};