import { Router } from "express";
import { bookRouter } from "./books";

const router = Router();

router.use("/books", bookRouter);

export { router };
