import { createContext, ReactNode, useContext, useState } from "react";

type UserContextType = {
  user: null | UserResponse;
  setUserDetails: (userDetails: User) => void;
};

type UserResponse = {
  id: number;
  createdAt: string;
  username: string;
};

type User = UserResponse | null;

export const userContext = createContext({} as UserContextType);

export const UserContext = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<null | UserResponse>(null);

  const setUserDetails = (userDetails: User) => {
    setUser(userDetails);
  };

  return (
    <userContext.Provider value={{ user, setUserDetails }}>
      {children}
    </userContext.Provider>
  );
};
