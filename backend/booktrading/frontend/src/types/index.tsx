type UserType = {
  id: number;
  username: string;
  createdAt: string;
};

type User = null | UserType;

export type { User, UserType };
