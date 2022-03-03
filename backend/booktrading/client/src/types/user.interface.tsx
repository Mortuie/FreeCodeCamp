import { ApiBookType } from "./books.interface";

type UserResponse = {
  id: number;
  createdAt: string;
  username: string;
  cookieUuid: string;
};

interface User {
  id: number;
  username: string;
  createdAt: string;
  image: string;
}

interface ApiUserWithBooksType extends User {
  books: ApiBookType;
}

export type { UserResponse, ApiUserWithBooksType };
