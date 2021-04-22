import { Router } from "express";
import booksRouter from "./books/booksRouter";
import userRouter from "./user/userRouter";

const v1Router = Router();

v1Router.use("/books", booksRouter);
v1Router.use("/users", userRouter);

export default v1Router;
