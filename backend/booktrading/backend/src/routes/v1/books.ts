import { Router } from "express";
import { INVALID_PARAMETERS } from "../../common/restErrors";
import { isAuthenticated } from "../../middleware";
import {
  createBook,
  filterParams,
  onlyBookId,
} from "../../types/booksRestTypes";
import { paginationBaseTypes } from "../../types/common";
import { prismaClient } from "../../utils/prismaClient";

const getV1BookRouter = () => {
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

    return res.json({ ...book });
  });

  bookRouter.get("/", async (req, res) => {
    const validatedQuery = paginationBaseTypes.safeParse(req.query);

    if (!validatedQuery.success) {
      return res.status(400).send(INVALID_PARAMETERS);
    }

    const optionalFilterParams = filterParams.safeParse(req.query);

    const queryParams = validatedQuery.data;

    const filter: any = {};

    if (
      optionalFilterParams.success &&
      optionalFilterParams.data.doesNotContainUserId
    ) {
      filter.where = {
        userId: {
          not: optionalFilterParams.data.doesNotContainUserId,
        },
      };
    }

    if (optionalFilterParams.success && optionalFilterParams.data.byUserId) {
      filter.where = {
        userId: optionalFilterParams.data.byUserId,
      };
    }

    const books = await prismaClient.books.findMany({
      skip: queryParams.offset,
      take: queryParams.limit,
      orderBy: {
        createdAt: "desc",
      },
      ...filter,
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });

    return res.json(books);
  });

  bookRouter.post("/", isAuthenticated, async (req, res) => {
    const validatedBody = createBook.safeParse(req.body);

    if (!validatedBody.success) {
      return res.status(400).json(INVALID_PARAMETERS);
    }

    if (!req.user) {
      return res.send("error, this will never happen though");
    }

    const body = validatedBody.data;

    const book = await prismaClient.books.create({
      data: {
        ...body,
        userId: req.user.id,
      },
    });

    return res.json({ data: book });
  });

  // need a delete route here.

  return bookRouter;
};

export { getV1BookRouter };
