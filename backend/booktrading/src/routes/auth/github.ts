import { Router } from "express";
import passport from "passport";

const githubAuthRouter = Router();

githubAuthRouter.get(
  "/",
  passport.authenticate("github", { scope: ["user:email"] })
);

githubAuthRouter.get(
  "/callback",
  passport.authenticate("github", { failureRedirect: "/failure" }),
  function (_req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

export default githubAuthRouter;
