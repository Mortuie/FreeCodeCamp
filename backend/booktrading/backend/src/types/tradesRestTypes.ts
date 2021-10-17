import { z } from "zod";

const onlyTradesId = z.object({
  tradesId: z.preprocess((val) => Number(val), z.number()),
});

const createTrades = z.object({
  toUserId: z.number(),
  toBookId: z.number(),
  fromBookId: z.number(),
  message: z.string().optional().default(""),
});

export { onlyTradesId, createTrades };
