import { UserResponse } from "./user.interface";

type BookWithoutUser = {
  createdAt: string;
  description: string;
  id: number;
  image: string;
  title: string;
  userId: number;
};

type BookWithUser = BookWithoutUser & {
  user: { username: string };
};

export type { BookWithUser, BookWithoutUser, UserResponse };
