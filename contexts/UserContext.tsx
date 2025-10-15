import React, { createContext, useContext, useState, ReactNode } from 'react';
import { USER_PROFILE_DATA } from '../constants';
import type { UserProfile } from '../types';

interface UserContextType {
  user: UserProfile;
  updateUser: (newDetails: Partial<UserProfile>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(USER_PROFILE_DATA);

  const updateUser = (newDetails: Partial<UserProfile>) => {
    setUser(prevUser => ({ ...prevUser, ...newDetails }));
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
