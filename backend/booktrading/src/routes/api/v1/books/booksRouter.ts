import { Router } from "express";
import { User } from "../../../../types/user";
import { isLoggedIn } from "../../../../utils/auth";
import { query } from "../../../../utils/db";

const booksRouter = Router();

booksRouter.get("/", async (req, res) => {
  const { rows } = await query("SELECT * FROM books;");

  res.json(rows);
});

booksRouter.get("/users", async (req, res) => {
  const { rows } = await query(
    "SELECT b.uuid as books_uuid, b.name, b.picture, b.created_at, u.fullname, u.uuid as users_uuid FROM books b JOIN users u ON b.user_uuid = u.uuid;"
  );

  res.json(rows);
});

booksRouter.get("/:book_uuid", async (req, res) => {
  const { book_uuid } = req.params;

  try {
    const { rows } = await query("SELECT * FROM books WHERE uuid = $1;", [
      book_uuid,
    ]);

    if (!rows.length) {
      return res.json({});
    }

    res.json(rows[0]);
  } catch (err) {
    console.log(err);
    return res.json({});
  }
});

booksRouter.get("/:book_uuid/users", async (req, res) => {
  const { book_uuid } = req.params;

  try {
    const {
      rows,
    } = await query(
      "SELECT b.uuid, b.name, b.picture, b.created_at, u.fullname FROM books b JOIN users u ON b.user_uuid = u.uuid WHERE b.uuid = $1;",
      [book_uuid]
    );

    if (!rows.length) {
      return res.json({});
    }

    res.json(rows[0]);
  } catch (err) {
    console.log(err);
    return res.json({});
  }
});

booksRouter.post("/", isLoggedIn, async (req, res) => {
  const { name, picture } = req.body;
  const user: any = req.user;
  const uuid = user.uuid;

  if (!name) {
    res
      .status(400)
      .json({ message: "Bad request input", type: "BAD_REQUEST_INPUT" });
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
      return res.status(404).json({
        message: `Book with uuid: ${book_uuid} not found`,
        type: "RESOURCE_NOT_FOUND",
      });
    } else {
      return res.status(200).json(rows[0]);
    }
  } catch (err) {
    res
      .status(400)
      .json({ message: "Bad request input", type: "BAD_REQUEST_INPUT" });
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
      return res.status(404).json({
        message: `Book with uuid: ${book_uuid} not found`,
        type: "RESOURCE_NOT_FOUND",
      });
    } else {
      return res.status(200).json({ message: "success", type: "SUCCESS" });
    }
  } catch (err) {
    res
      .status(400)
      .json({ message: "Bad request input", type: "BAD_REQUEST_INPUT" });
  }
});

export default booksRouter;
