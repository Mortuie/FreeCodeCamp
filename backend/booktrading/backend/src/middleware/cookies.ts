import { NextFunction, Request, RequestHandler, Response } from "express";
import { DateTime } from "luxon";
import { prismaClient } from "../utils/prismaClient";

const parseSignedCookies: RequestHandler = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const signedCookies = req.signedCookies;
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
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });

    if (row) {
      req.user = {
        userId: row.userId,
        cookieUuid: signedCookies.id,
        createdAt: row.createdAt,
        username: row.user.username,
      };
    }
    next();
  } else {
    next();
  }
};

export { parseSignedCookies };
