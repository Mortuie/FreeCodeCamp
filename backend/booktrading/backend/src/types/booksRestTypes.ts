import { z } from "zod";

const onlyBookId = z.object({
  bookId: z.preprocess((val) => Number(val), z.number()),
});

const createBook = z.object({
  title: z.string().min(3).max(50),
  description: z.string().min(5),
});

export { onlyBookId, createBook };
