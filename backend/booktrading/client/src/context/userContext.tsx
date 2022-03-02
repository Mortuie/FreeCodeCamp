import { createContext, ReactNode, useContext, useState } from "react";
import { UserResponse } from "../types";

type UserContextType = {
  user: User;
  setUserDetails: (userDetails: User) => void;
};

type User = UserResponse | null;

export const userContext = createContext({} as UserContextType);

export const UserContext = ({
  children,
  initialUser,
}: {
  children: ReactNode;
  initialUser: User;
}) => {
  const [user, setUser] = useState<User>(initialUser);

  const setUserDetails = (userDetails: User) => {
    setUser(userDetails);
  };

  return (
    <userContext.Provider value={{ user, setUserDetails }}>
      {children}
    </userContext.Provider>
  );
};
