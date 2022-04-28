import axios, { AxiosInstance } from "axios";
import { createContext, FC, ReactNode, useMemo } from "react";
import { UserType } from "../types";

class Api {
  private readonly axios: AxiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
    withCredentials: true,
  });

  public readonly UserApiV1: UserV1 = new UserV1(this.axios);
}

class UserV1 {
  constructor(private readonly axios: AxiosInstance) {}

  public register = async (username: string, password: string) => {
    return this.axios.post<UserType>("/v1/users/register", {
      username,
      password,
    });
  };
}

const ApiContext = createContext<Api>(new Api());

interface Props {
  children: ReactNode;
}

const ApiProvider: FC<Props> = ({ children }) => {
  const api = useMemo(() => new Api(), []);

  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
};

export { ApiContext, ApiProvider };
