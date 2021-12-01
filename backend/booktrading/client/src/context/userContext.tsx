import { createContext, ReactNode, useContext, useState } from "react";

type UserContextType = {
  user: boolean;
  toggleUser: () => void;
};

export const userContext = createContext({} as UserContextType);

export const UserContext = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(false);

  const toggleUser = () => {
    setUser((prevState) => !prevState);
  };

  return (
    <userContext.Provider value={{ user, toggleUser }}>
      {children}
    </userContext.Provider>
  );
};
