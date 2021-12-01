import { Router } from "express";
import { isAuthenticated } from "../../middleware";
import { getV1BookRouter } from "./books";
import { getV1TradesRouter } from "./trades";
import { getV1UserRouter } from "./users";

const getV1Router = (): Router => {
  const v1Router = Router();

  v1Router.use("/books", getV1BookRouter());
  v1Router.use("/users", getV1UserRouter());
  v1Router.use("/trades", getV1TradesRouter());

  v1Router.get("/checkauth", isAuthenticated, (req, res) => {
    return res.status(200).json();
  });

  return v1Router;
};

export { getV1Router };
