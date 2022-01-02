import { z } from "zod";

const DEFAULT_USERS_IMAGE_URI =
  "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0=";

const onlyUserId = z.object({
  userId: z.preprocess((val) => Number(val), z.number()),
});

const userAuthParams = z.object({
  username: z.string().min(1),
  password: z.string().min(3),
  image: z.string().optional().default(DEFAULT_USERS_IMAGE_URI),
});

const onlyId = z.object({
  id: z.preprocess((val) => Number(val), z.number()),
});

export { onlyUserId, userAuthParams, onlyId };
