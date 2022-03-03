import { Response, Request, Router } from "express";
import {
  INTERNAL_SERVER_ERROR,
  INVALID_PARAMETERS,
  NOT_FOUND,
} from "../../common/restErrors";
import {
  isAuthenticated,
  isLoggedOut,
  userIdMatchesLoggedInUserId,
} from "../../middleware";
import { prismaClient } from "../../utils/prismaClient";
import bcrypt from "bcrypt";
import { v4 } from "uuid";
import { DateTime } from "luxon";
import { parsedEnvVars } from "../../utils/envVars";
import { Prisma } from ".prisma/client";
import { onlyId, onlyUserId, userAuthParams } from "../../types/usersRestTypes";
import { paginationBaseTypes } from "../../types/common";
import _ from "lodash";
import { sanitiseUser } from "../../sanitise/common";

const getV1UserRouter = () => {
  // /api/v1/users....
  const userRouter = Router();

  userRouter.get("/logout", async (req, res) => {
    console.log("HERE");
    if (req.user) {
      await prismaClient.sessions.deleteMany({
        where: {
          cookieUuid: req.user.cookieUuid,
        },
      });
      res.clearCookie("id");
      delete req.user;
    }
    res.status(200).json();
  });

  userRouter.get("/", async (req: Request, res: Response) => {
    const validatedQueryParams = paginationBaseTypes.safeParse(req.query);

    return res.json({ message: "yessir", ...req.user });
  });

  userRouter.get("/status", (req, res) => {
    if (!req?.user) {
      return res.json(null);
    }

    return res.json({ ...req.user });
  });

  userRouter.get("/:id", async (req, res) => {
    const validatedParams = onlyId.safeParse(req.params);

    if (!validatedParams.success) {
      return res.status(400).json(INVALID_PARAMETERS);
    }

    const { id } = validatedParams.data;

    const user = await prismaClient.users.findUnique({
      where: {
        id,
      },
      include: {
        books: true,
      },
    });

    if (!user) {
      return res.status(404).json(NOT_FOUND);
    }

    return res.json(sanitiseUser(user));
  });

  userRouter.post("/login", isLoggedOut, async (req, res) => {
    const validatedBody = userAuthParams.safeParse(req.body);

    if (!validatedBody.success) {
      return res.status(400).json(INVALID_PARAMETERS);
    }

    const validatedUser = validatedBody.data;

    const user = await prismaClient.users.findUnique({
      where: {
        username: validatedUser.username,
      },
    });

    if (!user) {
      return res.status(404).json({
        errorType: "USER_NOT_FOUND",
        errorMessage: "No user with that username.",
      });
    }

    const comparedPasswords = await bcrypt.compare(
      validatedUser.password,
      user.password
    );

    if (!comparedPasswords) {
      return res.status(401).json({
        errorType: "UNAUTHORISED",
        errorMessage: "Wrong password please try again.",
      });
    } else {
      const result = {
        username: user.username,
        id: user.id,
        createdAt: user.createdAt,
      };

      const uuid = v4();

      const expires = DateTime.now().plus(parsedEnvVars.COOKIE_MAX_AGE);
      const sqlExpires = expires.toISO();
      const cookieExpires = expires.toMillis() - DateTime.now().toMillis();

      await prismaClient.sessions.create({
        data: {
          cookieUuid: uuid,
          userId: user.id,
          expiresAt: sqlExpires,
        },
      });

      res.cookie("id", uuid, {
        signed: true,
        maxAge: cookieExpires,
      });

      return res.json(result);
    }
  });

  userRouter.post("/register", isLoggedOut, async (req, res) => {
    const validatedBody = userAuthParams.safeParse(req.body);

    if (!validatedBody.success) {
      return res.status(400).json(INVALID_PARAMETERS);
    }

    const body = validatedBody.data;

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const tempUser = {
      ...validatedBody.data,
      password: hashedPassword,
    };

    try {
      const user = await prismaClient.users.create({
        data: tempUser,
      });

      const result = {
        username: user.username,
        id: user.id,
        createdAt: user.createdAt,
      };

      const uuid = v4();

      const expires = DateTime.now().plus(parsedEnvVars.COOKIE_MAX_AGE);
      const sqlExpires = expires.toISO();
      const cookieExpires = expires.toMillis() - DateTime.now().toMillis();

      await prismaClient.sessions.create({
        data: {
          cookieUuid: uuid,
          userId: user.id,
          expiresAt: sqlExpires,
        },
      });

      res.cookie("id", uuid, {
        signed: true,
        maxAge: cookieExpires,
      });

      return res.json(result);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2002") {
          return res.status(400).json({
            errorType: "USERNAME_ALREADY_EXISTS",
            message: "Username is already taken please try again.",
          });
        }
      }
      return res.status(500).json(INTERNAL_SERVER_ERROR);
    }
  });

  userRouter.delete(
    "/:userId",
    isAuthenticated,
    userIdMatchesLoggedInUserId,
    async (req, res) => {
      const validatedQueryParams = onlyUserId.safeParse(req.params);

      if (!validatedQueryParams.success) {
        return res.status(400).json(INVALID_PARAMETERS);
      }

      const userData = validatedQueryParams.data;

      const books = prismaClient.books.deleteMany({
        where: {
          userId: userData.userId,
        },
      });
      const sessions = prismaClient.sessions.deleteMany({
        where: {
          userId: userData.userId,
        },
      });
      const trades = prismaClient.trades.deleteMany({
        where: {
          OR: [{ toUserId: userData.userId }, { fromUserId: userData.userId }],
        },
      });
      const user = prismaClient.users.delete({
        where: {
          id: userData.userId,
        },
      });

      await prismaClient.$transaction([books, sessions, trades, user]);

      delete req.user;
      res.clearCookie("id");

      return res.status(200).json();
    }
  );

  return userRouter;
};

export { getV1UserRouter };
