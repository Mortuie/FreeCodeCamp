import passport from "passport";
import { Strategy } from "passport-github2";
import { query } from "../db";

const clientID = process.env.GITHUB_CLIENT_ID || "NO GITHUB CLIENT ID PRESENT";
const clientSecret =
  process.env.GITHUB_CLIENT_SECRET || "NO GITHUB CLIENT SECRET PRESENT";
const callbackURL = `${process.env.BASE_URL}:${process.env.APP_PORT}/auth/github/callback`;

passport.use(
  new Strategy(
    {
      clientID,
      clientSecret,
      callbackURL,
      scope: ["user:email"],
    },
    async (
      _accessToken: any,
      _refreshToken: any,
      profile: any,
      done: (arg0: null, arg1: any) => any
    ) => {
      console.log(profile);

      let user;

      const { rows } = await query(
        "SELECT * FROM users WHERE github_id = $1;",
        [profile.id]
      );

      user = rows.length ? rows[0] : [];

      if (!rows.length) {
        const { rows } = await query(
          `INSERT INTO users (fullname, picture, github_id) 
		VALUES ($1, $2, $3) RETURNING *;`,
          [profile.displayName, profile.photos[0].value, profile.id]
        );

        user = rows[0];
      }
      return done(null, user);
    }
  )
);
