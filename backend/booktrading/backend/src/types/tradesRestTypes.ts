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

const updateTrades = z.object({
  status: z.enum(["INCOMPLETE", "COMPLETE"]),
});

export { onlyTradesId, createTrades, updateTrades };
