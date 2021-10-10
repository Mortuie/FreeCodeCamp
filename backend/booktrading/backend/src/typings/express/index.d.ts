type User = {
  userId: number;
  cookieUuid: string;
};

declare module Express {
  export interface Request {
    user?: User;
  }
}
