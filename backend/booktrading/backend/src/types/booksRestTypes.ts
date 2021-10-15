import { z } from "zod";

const onlyBookId = z.object({
  bookId: z.preprocess((val) => Number(val), z.number()),
});

const createBook = z.object({
  title: z.string().max(50),
  description: z.string(),
});

export { onlyBookId, createBook };
