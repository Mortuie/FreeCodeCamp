import { Router } from "express";
import githubAuthRouter from "./github";
import localRouter from "./local";
import logoutRouter from "./logout";

const authRouter = Router();

authRouter.use("/logout", logoutRouter);
authRouter.use("/github", githubAuthRouter);
authRouter.use("/local", localRouter);

export default authRouter;
