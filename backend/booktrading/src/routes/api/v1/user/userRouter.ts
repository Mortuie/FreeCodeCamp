import { Router } from "express";
import { isLoggedIn } from "../../../../utils/auth";
import { query } from "../../../../utils/db";

const userRouter = Router();

userRouter.get("/", async (req, res) => {
  const { rows } = await query(
    "SELECT uuid, fullname, email, picture, city, country, created_at FROM users;"
  );

  res.status(200).json(rows);
});

userRouter.get("/:user_uuid", async (req, res) => {
  const { user_uuid } = req.params;

  try {
    const {
      rows,
    } = await query(
      "SELECT uuid, fullname, email, picture, city, country, created_at FROM users WHERE uuid = $1;",
      [user_uuid]
    );

    if (!rows.length) {
      return res.status(404).json({
        message: `User with uuid: ${user_uuid} not found`,
        type: "RESOURCE_NOT_FOUND",
      });
    } else {
      return res.status(200).json(rows[0]);
    }
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Bad request input", type: "BAD_REQUEST_INPUT" });
  }
});

userRouter.patch("/:user_uuid", isLoggedIn, async (req, res) => {
  const { fullname, country, city } = req.body;
  const user: any = req.user;
  const uuid = user.uuid;
});

userRouter.delete("/:user_uuid", isLoggedIn, async (req, res) => {});

export default userRouter;
