import dotenv from "dotenv";
dotenv.config();
const applicationPort = process.env.APP_PORT || "3000";
const secret = process.env.SESSION_SECRET || "NO SESSION SECRET DEFINED";

import express from "express";
import passport from "passport";
import session from "express-session";

import "./utils/genericPassport";
import "./utils/passport/github";
import "./utils/passport/local";
import authRouter from "./routes/auth/authRouter";
import apiRouter from "./routes/api/api";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRouter);
app.use("/api", apiRouter);

app.get("/", async (req, res) => {
  console.log(req.user);
  res.send(
    "<p>hehehe</p><a href='/auth/github'>github</a></br><a href='/auth/logout'>logout</a></br><a href='/route'>authroute</a></br><a href='/admin'>admin</a>"
  );
});

app.listen(applicationPort, () => {
  console.log(`Application is listening on port: ${applicationPort}`);
});
