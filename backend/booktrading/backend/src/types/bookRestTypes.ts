import { z } from "zod";

const onlyBookId = z.object({
  bookId: z.preprocess((val) => Number(val), z.number()),
});

const paginationBaseTypes = z.object({
  limit: z.preprocess((val) => Number(val), z.number()).default(30),
  offset: z.preprocess((val) => Number(val), z.number()).default(0),
});

const createBook = z.object({
  title: z.string().max(50),
  description: z.string(),
});

export { onlyBookId, paginationBaseTypes, createBook };
