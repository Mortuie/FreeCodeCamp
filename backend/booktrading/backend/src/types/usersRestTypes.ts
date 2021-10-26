import { z } from "zod";

const onlyUserId = z.object({
  userId: z.preprocess((val) => Number(val), z.number()),
});

const userAuthParams = z.object({
  username: z.string().min(1),
  password: z.string().min(3),
});

export { onlyUserId, userAuthParams };
