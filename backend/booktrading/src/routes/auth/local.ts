import { Router } from "express";
import passport from "passport";

const localRouter = Router();

localRouter.post(
  "/",
  passport.authenticate("local", {
    failureRedirect: "/failure",
  }),
  (req, res) => {
    res.send("YESSSS");
  }
);

export default localRouter;
