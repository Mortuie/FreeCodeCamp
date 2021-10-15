import { z } from "zod";

const onlyTradesId = z.object({
  tradesId: z.preprocess((val) => Number(val), z.number()),
});

const createTrades = z.object({
  toUserId: z.number(),
  message: z.string().optional(),
});

export { onlyTradesId, createTrades };
