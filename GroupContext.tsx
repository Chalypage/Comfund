import React, { createContext, useContext, useState } from 'react';

interface GroupMember {
  id: string;
  name: string;
  creditScore: number;
  securityFundPercentage: number;
  position: number;
  hasReceived: boolean;
  isActive: boolean;
  joinDate: string;
}

interface Group {
  id: string;
  name: string;
  contributionAmount: number;
  frequency: 'daily' | 'weekly' | 'monthly';
  maxMembers: number;
  currentMembers: number;
  members: GroupMember[];
  createdBy: string;
  isActive: boolean;
  currentRecipient?: string;
  nextContributionDate: string;
  securityFundRequired: number;
  status: 'recruiting' | 'active' | 'completed' | 'paused';
}

interface GroupContextType {
  groups: Group[];
  userGroups: Group[];
  availableGroups: Group[];
  createGroup: (groupData: Partial<Group>) => Promise<boolean>;
  joinGroup: (groupId: string) => Promise<boolean>;
  leaveGroup: (groupId: string) => Promise<boolean>;
  requestEmergencyPosition: (groupId: string) => Promise<boolean>;
  contributeToGroup: (groupId: string, amount: number) => Promise<boolean>;
}

const GroupContext = createContext<GroupContextType | undefined>(undefined);

export const useGroup = () => {
  const context = useContext(GroupContext);
  if (context === undefined) {
    throw new Error('useGroup must be used within a GroupProvider');
  }
  return context;
};

export const GroupProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [groups, setGroups] = useState<Group[]>([
    {
      id: '1',
      name: 'Circle A - Monthly Savers',
      contributionAmount: 5000,
      frequency: 'monthly',
      maxMembers: 10,
      currentMembers: 8,
      members: [
        {
          id: '1',
          name: 'John Doe',
          creditScore: 85,
          securityFundPercentage: 100,
          position: 1,
          hasReceived: false,
          isActive: true,
          joinDate: '2024-01-01'
        },
        {
          id: '2',
          name: 'Jane Smith',
          creditScore: 92,
          securityFundPercentage: 100,
          position: 2,
          hasReceived: true,
          isActive: true,
          joinDate: '2024-01-02'
        }
      ],
      createdBy: '1',
      isActive: true,
      currentRecipient: '1',
      nextContributionDate: '2024-02-01',
      securityFundRequired: 50000,
      status: 'active'
    },
    {
      id: '2',
      name: 'Weekly Builders',
      contributionAmount: 2000,
      frequency: 'weekly',
      maxMembers: 5,
      currentMembers: 3,
      members: [],
      createdBy: '2',
      isActive: false,
      nextContributionDate: '2024-01-25',
      securityFundRequired: 10000,
      status: 'recruiting'
    }
  ]);

  const userGroups = groups.filter(group => 
    group.members.some(member => member.id === '1') || group.createdBy === '1'
  );

  const availableGroups = groups.filter(group => 
    group.status === 'recruiting' && 
    !group.members.some(member => member.id === '1') &&
    group.createdBy !== '1'
  );

  const createGroup = async (groupData: Partial<Group>): Promise<boolean> => {
    const newGroup: Group = {
      id: Date.now().toString(),
      name: groupData.name || 'New Group',
      contributionAmount: groupData.contributionAmount || 1000,
      frequency: groupData.frequency || 'monthly',
      maxMembers: groupData.maxMembers || 10,
      currentMembers: 1,
      members: [{
        id: '1',
        name: 'John Doe',
        creditScore: 85,
        securityFundPercentage: 100,
        position: 1,
        hasReceived: false,
        isActive: true,
        joinDate: new Date().toISOString().split('T')[0]
      }],
      createdBy: '1',
      isActive: false,
      nextContributionDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      securityFundRequired: (groupData.contributionAmount || 1000) * (groupData.maxMembers || 10),
      status: 'recruiting'
    };

    setGroups(prev => [...prev, newGroup]);
    return true;
  };

  const joinGroup = async (groupId: string): Promise<boolean> => {
    setGroups(prev => prev.map(group => {
      if (group.id === groupId && group.currentMembers < group.maxMembers) {
        const newMember: GroupMember = {
          id: '1',
          name: 'John Doe',
          creditScore: 85,
          securityFundPercentage: 100,
          position: group.currentMembers + 1,
          hasReceived: false,
          isActive: true,
          joinDate: new Date().toISOString().split('T')[0]
        };

        return {
          ...group,
          members: [...group.members, newMember],
          currentMembers: group.currentMembers + 1,
          status: group.currentMembers + 1 === group.maxMembers ? 'active' : 'recruiting'
        };
      }
      return group;
    }));
    return true;
  };

  const leaveGroup = async (groupId: string): Promise<boolean> => {
    setGroups(prev => prev.map(group => {
      if (group.id === groupId) {
        return {
          ...group,
          members: group.members.filter(member => member.id !== '1'),
          currentMembers: group.currentMembers - 1
        };
      }
      return group;
    }));
    return true;
  };

  const requestEmergencyPosition = async (groupId: string): Promise<boolean> => {
    // Move user to first position in the group
    setGroups(prev => prev.map(group => {
      if (group.id === groupId) {
        const updatedMembers = group.members.map(member => {
          if (member.id === '1') {
            return { ...member, position: 1 };
          } else if (member.position === 1) {
            return { ...member, position: member.position + 1 };
          }
          return member;
        });

        return {
          ...group,
          members: updatedMembers.sort((a, b) => a.position - b.position),
          currentRecipient: '1'
        };
      }
      return group;
    }));
    return true;
  };

  const contributeToGroup = async (groupId: string, amount: number): Promise<boolean> => {
    // Handle contribution logic
    return true;
  };

  return (
    <GroupContext.Provider value={{
      groups,
      userGroups,
      availableGroups,
      createGroup,
      joinGroup,
      leaveGroup,
      requestEmergencyPosition,
      contributeToGroup
    }}>
      {children}
    </GroupContext.Provider>
  );
};