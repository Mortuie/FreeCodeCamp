import { Router } from "express";
import { INVALID_PARAMETERS } from "../common/restErrors";
import { isAuthenticated } from "../middleware";
import {
  createBook,
  onlyBookId,
  paginationBaseTypes,
} from "../types/bookRestTypes";
import { prismaClient } from "../utils/prismaClient";

// /api/v1/books.......
const bookRouter = Router();

bookRouter.get("/:bookId", async (req, res) => {
  const validatedQueryParams = onlyBookId.safeParse(req.params);

  if (!validatedQueryParams.success) {
    return res.status(400).send(INVALID_PARAMETERS);
  }

  const book = await prismaClient.books.findUnique({
    where: {
      id: validatedQueryParams.data.bookId,
    },
  });

  return res.json({ data: book });
});

bookRouter.get("/", async (req, res) => {
  const validatedQueryParams = paginationBaseTypes.safeParse(req.query);

  if (!validatedQueryParams.success) {
    return res.status(400).send(INVALID_PARAMETERS);
  }

  const queryParams = validatedQueryParams.data;

  const books = await prismaClient.books.findMany({
    skip: queryParams.offset,
    take: queryParams.limit,
  });

  return res.json({ data: books });
});

bookRouter.post("/", isAuthenticated, async (req, res) => {
  const validatedBody = createBook.safeParse(req.body);

  if (!validatedBody.success) {
    return res.status(400).send(INVALID_PARAMETERS);
  }

  if (!req.user) {
    return res.send("error, this will never happen though");
  }

  const body = validatedBody.data;

  const book = await prismaClient.books.create({
    data: {
      ...body,
      userId: req.user?.userId,
    },
  });

  return res.json({ data: book });
});

export { bookRouter };
