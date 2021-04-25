import { Router } from "express";
import { User } from "../../../../types/user";
import { isLoggedIn } from "../../../../utils/auth";
import { query } from "../../../../utils/db";

enum RESOURCE {
  BOOK = "Book",
}

interface Error {
  message: string;
  type: string;
}

const NOT_FOUND_ERROR = (type: RESOURCE, book_uuid: string): Error => ({
  message: `${type} with uuid: ${book_uuid} not found`,
  type: "RESOURCE_NOT_FOUND",
});

const BAD_REQUEST_ERROR: Error = {
  message: "Bad request input",
  type: "BAD_REQUEST_INPUT",
};

const booksRouter = Router();

booksRouter.get("/", async (req, res) => {
  const { rows } = await query(
    "SELECT b.*, u.fullname, u.picture as user_picture  FROM books b JOIN users u ON b.user_uuid = u.uuid;"
  );

  res.json(rows);
});

booksRouter.get("/:book_uuid", async (req, res) => {
  const { book_uuid } = req.params;

  try {
    const {
      rows,
    } = await query(
      "SELECT b.*, u.fullname, u.picture as user_picture  FROM books b JOIN users u ON b.user_uuid = u.uuid WHERE b.uuid = $1;",
      [book_uuid]
    );

    if (!rows.length) {
      return res.status(404).json(NOT_FOUND_ERROR(RESOURCE.BOOK, book_uuid));
    }

    res.json(rows[0]);
  } catch (err) {
    console.log(err);
    return res.status(400).json(BAD_REQUEST_ERROR);
  }
});

booksRouter.post("/", isLoggedIn, async (req, res) => {
  const { name, picture } = req.body;
  const user: any = req.user;
  const uuid = user.uuid;

  if (!name) {
    res.status(400).json(BAD_REQUEST_ERROR);
  }

  let rows;
  if (!picture) {
    const {
      rows: result,
    } = await query(
      "INSERT INTO books (name, user_uuid) VALUES ($1, $2) RETURNING *;",
      [name, uuid]
    );
    rows = result;
  } else {
    const {
      rows: result,
    } = await query(
      "INSERT INTO books (name, picture, user_uuid) VALUES ($1, $2, $3) RETURNING *;",
      [name, picture, uuid]
    );
    rows = result;
  }

  res.json(rows[0]);
});

booksRouter.patch("/:book_uuid", isLoggedIn, async (req, res) => {
  const { book_uuid } = req.params;
  const { name, picture } = req.body;
  const user: any = req.user;
  const uuid = user.uuid;

  try {
    const sqlQuery =
      "UPDATE books " +
      (name ? `SET name = '${name}' ` : "") +
      (picture ? `SET picture = '${picture}' ` : "") +
      "WHERE uuid = $1 AND user_uuid = $2 RETURNING *;";

    const { rows } = await query(sqlQuery, [book_uuid, uuid]);

    if (!rows.length) {
      return res.status(404).json(NOT_FOUND_ERROR(RESOURCE.BOOK, book_uuid));
    } else {
      return res.status(200).json(rows[0]);
    }
  } catch (err) {
    res.status(400).json(BAD_REQUEST_ERROR);
  }
});

booksRouter.delete("/:book_uuid", isLoggedIn, async (req, res) => {
  const { book_uuid } = req.params;
  const user: any = req.user;
  const uuid = user.uuid;

  try {
    const {
      rows,
    } = await query(
      "DELETE FROM books WHERE user_uuid = $1 AND uuid = $2 RETURNING *;",
      [uuid, book_uuid]
    );

    if (!rows.length) {
      return res.status(404).json(NOT_FOUND_ERROR(RESOURCE.BOOK, book_uuid));
    } else {
      return res.status(200).json({ message: "success", type: "SUCCESS" });
    }
  } catch (err) {
    res.status(400).json(BAD_REQUEST_ERROR);
  }
});

export default booksRouter;
