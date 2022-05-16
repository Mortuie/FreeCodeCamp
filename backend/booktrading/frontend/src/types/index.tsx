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

export { ModalType };
export type { User, UserType };
