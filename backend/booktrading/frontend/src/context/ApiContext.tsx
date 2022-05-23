import axios, { AxiosInstance } from "axios";
import { createContext, FC, ReactNode, useMemo } from "react";
import { UserV1, BooksV1 } from "../api";

class Api {
  private readonly axios: AxiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
    withCredentials: true,
  });
  public readonly UserV1: UserV1 = new UserV1(this.axios);
  public readonly BooksV1: BooksV1 = new BooksV1(this.axios);
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
