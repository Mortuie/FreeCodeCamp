import { Router } from "express";
import { EnvVarsType } from "../../utils/envVars";
import { getV1BookRouter } from "./books";
import { getV1TradesRouter } from "./trades";
import { getV1UserRouter } from "./users";

const getV1Router = (envVars: EnvVarsType): Router => {
  const v1Router = Router();

  v1Router.use("/books", getV1BookRouter());
  v1Router.use("/users", getV1UserRouter(envVars));
  v1Router.use("/trades", getV1TradesRouter());

  return v1Router;
};

export { getV1Router };
