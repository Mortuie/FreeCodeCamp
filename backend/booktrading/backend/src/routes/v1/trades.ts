import { Router } from "express";
import { INVALID_PARAMETERS, NOT_FOUND } from "../../common/restErrors";
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

    // TODO
  });
  tradesRouter.patch("/:tradesId", isAuthenticated, async (req, res) => {});
  tradesRouter.delete("/:tradesId", isAuthenticated, async (req, res) => {});

  return tradesRouter;
};

export { getV1TradesRouter };
