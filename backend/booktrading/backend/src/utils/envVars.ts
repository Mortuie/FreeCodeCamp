import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envVars = z.object({
  DATABASE_URL: z.string(),
  PORT: z.preprocess((val) => Number(val), z.number()).default(3000),
  COOKIE_SECRET: z.string().min(10),
  COOKIE_MAX_AGE: z.preprocess((val) => Number(val), z.number()).default(36000),
});

const parseEnvVars = () => {
  return envVars.parse(process.env);
};

type EnvVarsType = z.infer<typeof envVars>;

export { parseEnvVars, envVars, EnvVarsType };
