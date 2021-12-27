import axios, { AxiosInstance } from "axios";
import { createContext, FunctionComponent, useContext, useMemo } from "react";

export class Api {
  private readonly axios: AxiosInstance = axios.create({
    baseURL: "http://localhost:9000/api",
    validateStatus: () => true,
    withCredentials: true,
  });
  public readonly User: UserApi = new UserApi(this.axios);
  public readonly Books: BooksApi = new BooksApi(this.axios);
}

class UserApi {
  constructor(private readonly axios: AxiosInstance) {}

  public async signup(username: string, password: string) {
    return this.axios.post("/v1/users/register", {
      username,
      password,
    });
  }

  public async signin(username: string, password: string) {
    return this.axios.post("/v1/users/login", {
      username,
      password,
    });
  }

  public async logout() {
    return this.axios.get("v1/users/logout");
  }
}

class BooksApi {
  constructor(private readonly axios: AxiosInstance) {}

  public async createNewBook(title: string, description: string) {
    return this.axios.post("/v1/books", {
      title,
      description,
    });
  }

  public async getBooks() {
    return this.axios.get("/v1/books");
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
