import { Router } from "express";
import { User } from "../../../../types/user";
import { isLoggedIn } from "../../../../utils/auth";
import { query } from "../../../../utils/db";

const booksRouter = Router();

booksRouter.get("/", async (req, res) => {
  const { rows } = await query(
    "SELECT b.uuid, b.name, b.picture, b.created_at, u.fullname FROM books b JOIN users u ON b.user_uuid = u.uuid;"
  );

  res.json(rows);
});

booksRouter.get("/:bookId", async (req, res) => {
  const { bookId } = req.params;

  try {
    const {
      rows,
    } = await query(
      "SELECT b.uuid, b.name, b.picture, b.created_at, u.fullname FROM books b JOIN users u ON b.user_uuid = u.uuid WHERE b.uuid = $1;",
      [bookId]
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

  if (!name || !picture) {
    res
      .status(400)
      .json({ message: "Bad request input", type: "BAD_REQUEST_INPUT" });
  }

  const {
    rows,
  } = await query(
    "INSERT INTO books (name, picture, user_uuid) VALUES ($1, $2, $3) RETURNING *;",
    [name, picture, uuid]
  );

  console.log(rows);
  console.log(req.body);
  console.log(req.user);
  res.send("create book");
});

booksRouter.patch("/:bookId", isLoggedIn, async (req, res) => {
  res.send("update book");
});

booksRouter.delete("/:bookUuid", isLoggedIn, async (req, res) => {
  const { bookUuid } = req.params;
  const user: any = req.user;
  const uuid = user.uuid;


   


  res.send("delete book");
});

export default booksRouter;
