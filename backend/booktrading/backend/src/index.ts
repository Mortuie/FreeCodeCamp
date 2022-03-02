import express, { Router } from "express";
import cookieParser from "cookie-parser";
import { parseSignedCookies } from "./middleware";
import { getV1Router } from "./routes/v1";
import cors from "cors";
import { parsedEnvVars } from "./utils/envVars";
import morgan from "morgan";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser(parsedEnvVars.COOKIE_SECRET));

app.use(parseSignedCookies);
app.use(morgan("tiny"));
app.use("/api/v1", getV1Router());

app.listen(parsedEnvVars.PORT, () => {
  console.log(`Listening on port: ${parsedEnvVars.PORT}`);
});

process.on("SIGTERM", () => {
  process.exit();
});
