import axios, { AxiosInstance } from "axios";
import { createContext, FunctionComponent, useContext, useMemo } from "react";

export class Api {
  private readonly axios: AxiosInstance = axios.create({
    baseURL: "http://localhost:9000/api",
  });
  public readonly User: UserApi = new UserApi(this.axios);
}

class UserApi {
  constructor(private readonly axios: AxiosInstance) {}

  public async signup(username: string, password: string) {
    return this.axios.post(
      "/v1/users/register",
      {
        username,
        password,
      },
      { validateStatus: () => true }
    );
  }
}

export const apiContext = createContext<Api>(new Api());

export const ApiProvider: FunctionComponent = ({ children }) => {
  const api = useMemo(() => new Api(), []);

  return <apiContext.Provider value={api}>{children}</apiContext.Provider>;
};

export const useApi = (): Api => {
  return useContext(apiContext);
};
