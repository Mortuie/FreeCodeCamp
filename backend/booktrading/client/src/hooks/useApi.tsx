import axios, { Axios, AxiosInstance } from "axios";
import { createContext, FunctionComponent, useContext, useMemo } from "react";
import { ApiBookType, ApiBookTypeWithUser } from "../types";

const PORT = 9001;

export class Api {
  private readonly axios: AxiosInstance = axios.create({
    baseURL: `http://localhost:${PORT}/api`,
    validateStatus: () => true,
    withCredentials: true,
  });
  public readonly User: UserApi = new UserApi(this.axios);
  public readonly Books: BooksApi = new BooksApi(this.axios);
  public readonly Trades: TradesApi = new TradesApi(this.axios);
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
    return this.axios.get("/v1/users/logout");
  }

  public async getUserById(userId: string) {
    return this.axios.get(`/v1/users/${userId}`);
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

  public async getBooks(doesNotContainUserId: number | null) {
    const filter: { doesNotContainUserId?: number } = {};
    if (doesNotContainUserId) {
      filter.doesNotContainUserId = doesNotContainUserId;
    }
    return this.axios.get<ApiBookTypeWithUser[]>("/v1/books", {
      params: filter,
    });
  }

  public async getBook(id: string) {
    return this.axios.get<ApiBookType | null>(`/v1/books/${id}`);
  }
}

interface d {
  toUserId: number;
  toBookId: number;
  fromBookId: number;
  message?: string;
}

class TradesApi {
  constructor(private readonly axios: AxiosInstance) {}

  public async createNewTrade(data: d) {
    return this.axios.post("/v1/trades", { ...data });
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
