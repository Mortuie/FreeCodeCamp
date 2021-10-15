import { z } from "zod";

const paginationBaseTypes = z.object({
  limit: z.preprocess((val) => Number(val), z.number()).default(30),
  offset: z.preprocess((val) => Number(val), z.number()).default(0),
});

export { paginationBaseTypes };
