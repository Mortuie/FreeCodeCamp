import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envVars = z.object({
  DATABASE_URL: z.string(),
  PORT: z.preprocess((val) => Number(val), z.number()).default(9000),
  COOKIE_SECRET: z.string().min(10),
  COOKIE_MAX_AGE: z
    .preprocess((val) => Number(val), z.number())
    .default(36000000),
});

const parsedEnvVars = (() => {
  return envVars.parse(process.env);
})();

type EnvVarsType = z.infer<typeof envVars>;

export { EnvVarsType, parsedEnvVars };
