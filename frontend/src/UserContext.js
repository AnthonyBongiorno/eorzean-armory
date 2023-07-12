import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [refetch, setRefetch] = useState(false);

  return (
    <UserContext.Provider value={{ user, setUser, refetch, setRefetch }}>
      {children}
    </UserContext.Provider>
  );
};