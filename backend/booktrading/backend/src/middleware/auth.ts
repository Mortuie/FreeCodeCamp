import { NextFunction, Response, Request } from "express";
import {
  AUTHENTICATED,
  INVALID_PARAMETERS,
  UNAUTHENTICATED,
  UNAUTHORISED,
} from "../common/restErrors";
import { onlyUserId } from "../types/usersRestTypes";

const isLoggedOut = (req: Request, res: Response, next: NextFunction) => {
  const loggedInUser = req.user;

  if (loggedInUser) {
    return res.json(AUTHENTICATED);
  }

  next();
};

/**
 * Checks whether a user is logged in or not
 */
const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const loggedInUser = req.user;

  if (!loggedInUser) {
    return res.status(401).send(UNAUTHENTICATED);
  }

  next();
};

const userIdMatchesLoggedInUserId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validatedUserId = onlyUserId.safeParse(req.params);
  if (!validatedUserId.success) {
    return res.status(400).send(INVALID_PARAMETERS);
  }

  const loggedInUser = req.user?.id;
  const userIdRequest = validatedUserId.data.userId;

  if (userIdRequest !== loggedInUser) {
    return res.status(403).send(UNAUTHORISED);
  }

  next();
};

export { userIdMatchesLoggedInUserId, isAuthenticated, isLoggedOut };
