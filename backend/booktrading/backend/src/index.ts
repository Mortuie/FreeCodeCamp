import { parseEnvVars } from "./utils/envVars";
import express from "express";
import cookieParser from "cookie-parser";
import { parseSignedCookies } from "./middleware";
import { getV1Router } from "./routes/v1";
import cors from "cors";

const app = express();
const envVars = parseEnvVars();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser(envVars.COOKIE_SECRET));

app.use(parseSignedCookies);

app.use("/api/v1", getV1Router(envVars));

app.listen(envVars.PORT, () => {
  console.log(`Listening on port: ${envVars.PORT}`);
});
