type User = {
  userId: number;
  cookieUuid: string;
  createdAt: Date;
  username: string;
};

declare module Express {
  export interface Request {
    user?: User;
  }
}
