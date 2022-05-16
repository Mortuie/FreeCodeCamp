import { AxiosInstance } from "axios";
import { UserType } from "../types";

export class UserV1 {
  constructor(private readonly axios: AxiosInstance) {}

  public register(username: string, password: string) {
    return this.axios.post<UserType>("/v1/users/register", {
      username,
      password,
    });
  }

  public logout() {
    return this.axios.get("/v1/users/logout");
  }
}
