import passport from "passport";
import { Strategy } from "passport-local";
import { query } from "../db";
import bcrypt from "bcrypt";

passport.use(
  new Strategy(
    { usernameField: "email", passReqToCallback: true },
    async (req, email, password, done) => {
      console.log("deets", req.body, email, password);
      const { fullname } = req.body;

      if (!fullname) {
        return done("No fullname provided", null);
      }

      const { rows } = await query("SELECT * FROM users WHERE local_id = $1;", [
        email,
      ]);

      if (!rows.length) {
        // no user -- create user
        const hashedPassword = await bcrypt.hash(password, 15);
        const {
          rows,
        } = await query(
          "INSERT INTO users (fullname, picture, email, local_id, password) values ($1, $2, $3, $4, $5) RETURNING *;",
          [fullname, "https://www.google.com", email, email, hashedPassword]
        );

        return done(null, rows[0]);
      } else {
        // user exists - check password
        const existingUser = rows[0];
        const { password: existingUserPassword } = existingUser;

        const isPasswordSame = await bcrypt.compare(
          password,
          existingUserPassword
        );

        if (!isPasswordSame) {
          return done("Invalid Password", null);
        } else {
          return done(null, existingUser);
        }
      }
    }
  )
);
