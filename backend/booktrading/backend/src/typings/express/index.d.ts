type User = {
  userId: number;
  cookieUuid: string;
  createdAt: Date;
};

declare module Express {
  export interface Request {
    user?: User;
  }
}
