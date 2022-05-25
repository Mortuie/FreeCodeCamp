type UserType = {
  id: number;
  username: string;
  createdAt: string;
};

type User = null | UserType;

enum ModalType {
  NONE,
  LOADING,
}

interface Books {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  image: string;
  userId: number;
}

export { ModalType };
export type { User, UserType, Books };
