interface ApiBookType {
  createdAt: string;
  description: string;
  id: number;
  image: string;
  title: string;
  userId: number;
}

interface ApiBookTypeWithUser extends ApiBookType {
  user: { username: string };
}

export type { ApiBookType, ApiBookTypeWithUser };
