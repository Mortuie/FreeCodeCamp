import { createContext, FC, ReactNode, useState } from "react";
import type { User } from "../types";

interface UserContextType {
  user: User;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
}

const UserContext = createContext({} as UserContextType);

interface Props {
  children: ReactNode;
}

const UserProvider: FC<Props> = ({ children }) => {
  const [user, _setUser] = useState<User>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const login = async (username: string, password: string) => {};

  const register = async (username: string, password: string) => {};

  const logout = async () => {};

  return (
    <UserContext.Provider value={{ user, loading, login, register }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
