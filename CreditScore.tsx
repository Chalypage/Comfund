import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Award, 
  Target, 
  CheckCircle, 
  Clock,
  AlertTriangle,
  Users,
  Shield
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useUser } from '../../contexts/UserContext';

export const CreditScore: React.FC = () => {
  const { user } = useAuth();
  const { userStats } = useUser();

  const creditScore = user?.creditScore || 50;
  const scoreColor = creditScore >= 85 ? 'text-lime-accent' : creditScore >= 75 ? 'text-blue-500' : creditScore >= 50 ? 'text-orange-500' : 'text-red-500';
  const scoreGradient = creditScore >= 85 ? 'from-lime-accent to-lime-accent/80' : creditScore >= 75 ? 'from-blue-500 to-blue-400' : creditScore >= 50 ? 'from-orange-500 to-orange-400' : 'from-red-500 to-red-400';

  const factors = [
    {
      title: 'Payment History',
      score: 95,
      weight: 35,
      status: 'excellent',
      description: 'Consistent on-time contributions'
    },
    {
      title: 'Group Participation',
      score: 88,
      weight: 25,
      status: 'good',
      description: 'Active in multiple circles'
    },
    {
      title: 'Security Fund Maintenance',
      score: 92,
      weight: 20,
      status: 'excellent',
      description: 'Always maintains required funds'
    },
    {
      title: 'Emergency Fund Usage',
      score: 100,
      weight: 10,
      status: 'excellent',
      description: 'No emergency fund usage'
    },
    {
      title: 'Account Age',
      score: 75,
      weight: 10,
      status: 'good',
      description: 'Member for 8 months'
    }
  ];

  const benefits = [
    {
      scoreRange: '85-100',
      title: 'Premium Member',
      benefits: [
        'Create groups',
        'Request emergency funds',
        'Priority positioning',
        'Lower fees'
      ],
      color: 'lime-accent',
      available: creditScore >= 85
    },
    {
      scoreRange: '75-84',
      title: 'Advanced Member',
      benefits: [
        'Request emergency funds',
        'Join premium groups',
        'Extended security fund options'
      ],
      color: 'blue-500',
      available: creditScore >= 75
    },
    {
      scoreRange: '50-74',
      title: 'Standard Member',
      benefits: [
        'Join standard groups',
        'Basic savings features',
        'Standard security fund'
      ],
      color: 'orange-500',
      available: creditScore >= 50
    }
  ];

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
          <h2 className="text-3xl font-bold text-light-text dark:text-dark-text">Credit Score</h2>
          <p className="text-light-text-secondary dark:text-dark-text-secondary mt-1">
            Your financial reputation and membership benefits
          </p>
        </div>
      </motion.div>

      {/* Score Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={`bg-gradient-to-br ${scoreGradient} rounded-2xl p-8 text-white shadow-glow`}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Score Display */}
          <div className="text-center md:text-left">
            <p className="text-white/80 text-sm uppercase tracking-wider mb-2">Your Credit Score</p>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3, type: "spring" }}
              className="flex items-baseline space-x-2"
            >
              <span className="text-6xl font-bold">{creditScore}</span>
              <span className="text-2xl">/100</span>
            </motion.div>
            <div className="flex items-center space-x-2 mt-3">
              <TrendingUp className="w-5 h-5" />
              <span className="text-sm">+5 points this month</span>
            </div>
          </div>

          {/* Score Ring */}
          <div className="flex items-center justify-center">
            <div className="relative w-32 h-32">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="8"
                  fill="none"
                />
                <motion.circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="white"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 50}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 50 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 50 * (1 - creditScore / 100) }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <Award className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-4">
            <div>
              <p className="text-white/80 text-sm">Membership Level</p>
              <p className="text-lg font-bold">
                {creditScore >= 85 ? 'Premium' : creditScore >= 75 ? 'Advanced' : 'Standard'}
              </p>
            </div>
            <div>
              <p className="text-white/80 text-sm">Groups Completed</p>
              <p className="text-lg font-bold">{userStats.completedCircles}</p>
            </div>
            <div>
              <p className="text-white/80 text-sm">Perfect Payments</p>
              <p className="text-lg font-bold">100%</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Score Factors */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-light-surface/50 dark:bg-dark-surface/50 backdrop-blur-sm border border-light-border dark:border-dark-border rounded-2xl p-6"
      >
        <h3 className="text-xl font-bold text-light-text dark:text-dark-text mb-6">Score Breakdown</h3>
        
        <div className="space-y-4">
          {factors.map((factor, index) => (
            <motion.div
              key={factor.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
              className="flex items-center justify-between p-4 bg-light-glass dark:bg-dark-glass rounded-xl"
            >
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-light-text dark:text-dark-text">{factor.title}</h4>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                      {factor.weight}% weight
                    </span>
                    <span className={`font-bold ${
                      factor.status === 'excellent' ? 'text-lime-accent' :
                      factor.status === 'good' ? 'text-blue-500' : 'text-orange-500'
                    }`}>
                      {factor.score}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-3">
                  {factor.description}
                </p>
                <div className="w-full bg-light-border dark:bg-dark-border rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${factor.score}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    className={`h-2 rounded-full ${
                      factor.status === 'excellent' ? 'bg-lime-accent' :
                      factor.status === 'good' ? 'bg-blue-500' : 'bg-orange-500'
                    }`}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Benefits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-light-surface/50 dark:bg-dark-surface/50 backdrop-blur-sm border border-light-border dark:border-dark-border rounded-2xl p-6"
      >
        <h3 className="text-xl font-bold text-light-text dark:text-dark-text mb-6">Membership Benefits</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.scoreRange}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
              className={`border-2 rounded-xl p-6 transition-all ${
                benefit.available
                  ? `border-${benefit.color} bg-${benefit.color}/10`
                  : 'border-light-border dark:border-dark-border bg-light-glass dark:bg-dark-glass opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className={`font-bold ${benefit.available ? `text-${benefit.color}` : 'text-light-text-secondary dark:text-dark-text-secondary'}`}>
                  {benefit.title}
                </h4>
                {benefit.available ? (
                  <CheckCircle className={`w-5 h-5 text-${benefit.color}`} />
                ) : (
                  <Clock className="w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary" />
                )}
              </div>
              
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-4">
                Score Range: {benefit.scoreRange}
              </p>
              
              <ul className="space-y-2">
                {benefit.benefits.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center space-x-2 text-sm">
                    <div className={`w-1.5 h-1.5 rounded-full ${benefit.available ? `bg-${benefit.color}` : 'bg-light-text-secondary dark:bg-dark-text-secondary'}`} />
                    <span className={benefit.available ? 'text-light-text dark:text-dark-text' : 'text-light-text-secondary dark:text-dark-text-secondary'}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Improvement Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-light-surface/50 dark:bg-dark-surface/50 backdrop-blur-sm border border-light-border dark:border-dark-border rounded-2xl p-6"
      >
        <h3 className="text-xl font-bold text-light-text dark:text-dark-text mb-6">How to Improve Your Score</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-lime-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Target className="w-4 h-4 text-lime-accent" />
              </div>
              <div>
                <h4 className="font-medium text-light-text dark:text-dark-text">Make Timely Contributions</h4>
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  Always contribute on time to maintain a perfect payment history
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="w-4 h-4 text-blue-500" />
              </div>
              <div>
                <h4 className="font-medium text-light-text dark:text-dark-text">Join More Groups</h4>
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  Participate in multiple circles to show consistent engagement
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Shield className="w-4 h-4 text-orange-500" />
              </div>
              <div>
                <h4 className="font-medium text-light-text dark:text-dark-text">Maintain Security Funds</h4>
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  Keep your security fund at 100% to show financial stability
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-4 h-4 text-purple-500" />
              </div>
              <div>
                <h4 className="font-medium text-light-text dark:text-dark-text">Avoid Emergency Funds</h4>
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  Use emergency funds sparingly to maintain a high score
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};