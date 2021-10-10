import { z } from "zod";

const onlyUserId = z.object({
  userId: z.preprocess((val) => Number(val), z.number()),
});

const userAuthParams = z.object({
  username: z.string(),
  password: z.string(),
});

export { onlyUserId, userAuthParams };
