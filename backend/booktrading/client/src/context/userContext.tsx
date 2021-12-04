import { createContext, ReactNode, useContext, useState } from "react";

type UserContextType = {
  user: any;
  isLoggedIn: boolean;
  toggleUser: () => void;
  setUserDetails: (userDetails: UserResponse) => void;
};

type UserResponse = {
  id: number;
  createdAt: string;
  username: string;
};

export const userContext = createContext({} as UserContextType);

export const UserContext = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  const toggleUser = () => {
    setIsLoggedIn((prevState) => !prevState);
  };

  const setUserDetails = (userDetails: UserResponse) => {
    setIsLoggedIn(true);
    setUser(userDetails);
  };

  return (
    <userContext.Provider
      value={{ user, toggleUser, isLoggedIn, setUserDetails }}
    >
      {children}
    </userContext.Provider>
  );
};
