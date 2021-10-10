import { parseEnvVars } from "./utils/envVars";
import express from "express";
import { prismaClient } from "./utils/prismaClient";
import bcrypt from "bcrypt";
import { Prisma } from ".prisma/client";
import cookieParser from "cookie-parser";
import { v4 } from "uuid";
import { DateTime } from "luxon";
import {
  isAuthenticated,
  isLoggedOut,
  userIdMatchesLoggedInUserId,
} from "./middleware";
import { onlyUserId, userAuthParams } from "./types";
import { INVALID_PARAMETERS } from "./common/restErrors";
import { router } from "./routes";

const app = express();
const envVars = parseEnvVars();

app.use(express.json());
app.use(cookieParser(envVars.COOKIE_SECRET));

app.use(async (req, _, next) => {
  const signedCookies = req.signedCookies;
  console.log("COOKIE ID", signedCookies?.id);
  if (signedCookies?.id) {
    const dateNow = DateTime.now().toISO();
    const row = await prismaClient.sessions.findFirst({
      where: {
        AND: [
          {
            cookieUuid: signedCookies.id,
          },
          {
            expiresAt: {
              gt: dateNow,
            },
          },
        ],
      },
    });

    if (row) {
      req.user = {
        userId: row.userId,
        cookieUuid: signedCookies.id,
      };
    }
    next();
  } else {
    next();
  }
});

app.get("/test", (req, res) => {
  console.log("USER", req.user);

  res.send("YES");
});

app.use("/api/v1", router);

app.post("/api/login", isLoggedOut, async (req, res) => {
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

    const expires = DateTime.now().plus(envVars.COOKIE_MAX_AGE);
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

app.post("/api/register", isLoggedOut, async (req, res) => {
  const validatedBody = userAuthParams.safeParse(req.body);

  if (!validatedBody.success) {
    return res.status(400).json(INVALID_PARAMETERS);
  }

  const hashedPassword = await bcrypt.hash(validatedBody.data.password, 10);

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

    const expires = DateTime.now().plus(envVars.COOKIE_MAX_AGE);
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
    return res.status(500).json({
      errorType: "INTERNAL_SERVER_ERROR",
      message: "Internal server error.",
    });
  }
});

app.get("/api/logout", async (req, res) => {
  if (req.user) {
    await prismaClient.sessions.deleteMany({
      where: {
        cookieUuid: req.user.cookieUuid,
      },
    });
    res.clearCookie("id");
    delete req.user;
  }
  res.json({ message: "successful" });
});

app.delete(
  "/api/users/:userId",
  isAuthenticated,
  userIdMatchesLoggedInUserId,
  async (req, res) => {
    const validatedQueryParams = onlyUserId.safeParse(req.params);

    if (!validatedQueryParams.success) {
      return res.status(400).json(INVALID_PARAMETERS);
    }

    const userData = validatedQueryParams.data;

    await prismaClient.books.deleteMany({
      where: {
        userId: userData.userId,
      },
    });
    await prismaClient.sessions.deleteMany({
      where: {
        userId: userData.userId,
      },
    });
    await prismaClient.users.deleteMany({
      where: {
        id: userData.userId,
      },
    });

    delete req.user;
    res.clearCookie("id");

    return res.json({ message: "successful" });
  }
);

app.listen(envVars.PORT, () => {
  console.log(`Listening on port: ${envVars.PORT}`);
});
