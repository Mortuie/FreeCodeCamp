import { z } from "zod";

const DEFAULT_BOOK_IMAGE_URI =
  "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1600572146l/55381916._SX318_.jpg";

const onlyBookId = z.object({
  bookId: z.preprocess((val) => Number(val), z.number()),
});

const createBook = z.object({
  title: z.string().min(3).max(50),
  description: z.string().min(5),
  image: z.string().optional().default(DEFAULT_BOOK_IMAGE_URI),
});

const filterParams = z.object({
  doesNotContainUserId: z
    .preprocess((val) => Number(val), z.number())
    .optional(),
  byUserId: z.preprocess((val) => Number(val), z.number()).optional(),
});

export { onlyBookId, createBook, filterParams };
