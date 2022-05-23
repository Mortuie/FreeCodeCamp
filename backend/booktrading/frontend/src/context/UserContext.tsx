import { createContext, FC, ReactNode, useState } from "react";
import { useApi, useModal } from "../hooks";
import type { User } from "../types";
import axios from "axios";
import toast from "react-hot-toast";

interface UserContextType {
  user: User;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const UserContext = createContext({} as UserContextType);

interface Props {
  children: ReactNode;
}

const UserProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { UserV1 } = useApi();
  const { startLoading, stopLoading } = useModal();

  const login = async (username: string, password: string) => {
    try {
      startLoading();
      const { data, status } = await UserV1.login(username, password);
      setUser(data);
      console.log(data, status);
    } catch (e) {
    } finally {
      stopLoading();
    }
  };

  const register = async (username: string, password: string) => {
    try {
      startLoading();
      const { data, status } = await UserV1.register(username, password);
      console.log(data);
      setUser(data);
    } catch (e) {
      console.log(e);

      if (axios.isAxiosError(e) && e.response) {
        console.log("message", e.response.data);
        toast.error(e.response.data.message);
      }
    } finally {
      stopLoading();
    }
  };

  const logout = async () => {
    try {
      startLoading();
      const { data, status } = await UserV1.logout();
      console.log(data, status);
      if (status === 200) {
        setUser(null);
      }
    } catch (e) {
      console.log(e);
    } finally {
      stopLoading();
    }
  };

  return (
    <UserContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
