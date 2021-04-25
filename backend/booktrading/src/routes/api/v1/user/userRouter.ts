import { Router } from "express";
import { isLoggedIn } from "../../../../utils/auth";
import { query } from "../../../../utils/db";

interface Error {
  message: string;
  type: string;
}

const NOT_AUTHORISED_ERROR = {
  message: "You are not authorised to do this action",
  type: "NOT_AUTHORISED",
};

const BAD_REQUEST_ERROR: Error = {
  message: "Bad request input",
  type: "BAD_REQUEST_INPUT",
};

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
  const { user_uuid } = req.params;
  const { fullname, country, city } = req.body;
  const user: any = req.user;
  const uuid = user.uuid;

  if (user_uuid !== uuid) {
    return res.status(403).json(NOT_AUTHORISED_ERROR);
  }

  if (!fullname && !country && !city) {
    return res.status(400).json(BAD_REQUEST_ERROR);
  }

  let sqlStatement: string = "UPDATE users SET ";
  const values: any[] = [];
  let index: number = 1;

  if (fullname) {
    sqlStatement += `fullname = $${index++}${!country ? "" : ","} `;
    values.push(fullname);
  }

  if (country) {
    sqlStatement += `country = $${index++}${!city ? "" : ","} `;
    values.push(country);
  }

  if (city) {
    sqlStatement += `city = $${index++} `;
    values.push(city);
  }

  sqlStatement += `WHERE uuid = $${index} RETURNING uuid, fullname, city, country, picture, created_at, email;`;
  values.push(user_uuid);

  console.log(sqlStatement, values);

  const { rows } = await query(sqlStatement, values);

  return res.status(200).json(rows[0]);
});

userRouter.delete("/:user_uuid", isLoggedIn, async (req, res) => {
  const { user_uuid } = req.params;
  const user: any = req.user;
  const uuid = user.uuid;

  if (user_uuid === uuid) {
    await query("DELETE FROM books WHERE user_uuid = $1;", [uuid]);
    await query("DELETE FROM users WHERE uuid = $1", [uuid]);
    req.logout();
    res
      .status(200)
      .json({ message: "Delete successful", type: "DATA_DELETED" });
  } else {
    // not authorised
    res.status(403).json(NOT_AUTHORISED_ERROR);
  }
});

export default userRouter;
