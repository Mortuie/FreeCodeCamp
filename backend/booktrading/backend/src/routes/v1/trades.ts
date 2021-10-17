import { Router } from "express";
import {
  INVALID_PARAMETERS,
  NOT_FOUND,
  UNAUTHORISED,
} from "../../common/restErrors";
import { isAuthenticated } from "../../middleware";
import { paginationBaseTypes } from "../../types/common";
import { createTrades, onlyTradesId } from "../../types/tradesRestTypes";
import { prismaClient } from "../../utils/prismaClient";

const getV1TradesRouter = () => {
  const tradesRouter = Router();

  tradesRouter.get("/", async (req, res) => {
    const validatedQueryParams = paginationBaseTypes.safeParse(req.query);

    if (!validatedQueryParams.success) {
      return res.status(400).send(INVALID_PARAMETERS);
    }

    const queryParams = validatedQueryParams.data;

    const trades = await prismaClient.trades.findMany({
      skip: queryParams.offset,
      take: queryParams.limit,
    });

    return res.json({ data: trades });
  });

  tradesRouter.get("/:tradesId", async (req, res) => {
    const validatedParams = onlyTradesId.safeParse(req.params);

    if (!validatedParams.success) {
      return res.status(400).json(INVALID_PARAMETERS);
    }

    const params = validatedParams.data;

    const trade = await prismaClient.trades.findUnique({
      where: {
        id: params.tradesId,
      },
    });

    if (!trade) {
      return res.status(404).json(NOT_FOUND);
    }

    return res.json({ data: trade });
  });

  tradesRouter.post("/", isAuthenticated, async (req, res) => {
    const validatedBody = createTrades.safeParse(req.body);

    if (!validatedBody.success) {
      return res.status(400).json(INVALID_PARAMETERS);
    }

    if (!req?.user) {
      return res.send("error, this will never happen though");
    }

    const tempTrade = validatedBody.data;

    const trade = await prismaClient.trades.create({
      data: {
        ...tempTrade,
        fromUserId: req.user?.userId,
      },
      include: {
        toUser: {
          select: {
            id: true,
            username: true,
            createdAt: true,
          },
        },
        fromUser: {
          select: {
            id: true,
            username: true,
            createdAt: true,
          },
        },
        toBook: true,
        fromBook: true,
      },
    });

    return res.json({ data: trade });
  });
  tradesRouter.patch("/:tradesId", isAuthenticated, async (req, res) => {});

  tradesRouter.delete("/:tradesId", isAuthenticated, async (req, res) => {
    const validatedQueryParams = onlyTradesId.safeParse(req.params);

    if (!validatedQueryParams.success) {
      return res.status(400).send(INVALID_PARAMETERS);
    }

    if (!req?.user) {
      return res.send("error, this will never happen though");
    }

    const tradesId = validatedQueryParams.data.tradesId;
    const userId = req.user.userId;

    const trade = await prismaClient.trades.findUnique({
      where: {
        id: tradesId,
      },
    });
    if (!trade) {
      return res.status(404).json(NOT_FOUND);
    } else if (trade.fromUserId !== userId) {
      return res.status(403).json(UNAUTHORISED);
    } else {
      await prismaClient.trades.delete({
        where: { id: tradesId },
      });

      return res.status(200).json();
    }
  });

  return tradesRouter;
};

export { getV1TradesRouter };
