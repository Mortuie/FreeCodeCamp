import { Router } from "express";
import booksRouter from "./books/booksRouter";

const v1Router = Router();

v1Router.use("/books", booksRouter);

export default v1Router;
