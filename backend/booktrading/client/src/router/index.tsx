import { Route, Routes } from "react-router";
import * as p from "../pages";
import NeedAuth from "./NeedAuth";
import NeedNoAuth from "./NeedNoAuth";

const Router = () => {
  return (
    <Routes>
      {/* public routes you can also be logged in to see*/}
      <Route path="/" element={<p.Dashboard />} />
      <Route path="/profile/:id" element={<p.Profile />} />
      <Route path="/books/:id" element={<p.Book />} />

      {/* should be logged in to see these routes */}
      <Route path="/books/new" element={<NeedAuth component={p.Newbook} />} />
      <Route
        path="/trades/new/:toUserId/:toBookId"
        element={<NeedAuth component={p.NewTrades} />}
      />

      {/* should be logged out to see these routes */}
      <Route
        path="/auth/signin"
        element={<NeedNoAuth component={p.Signin} />}
      />
      <Route
        path="/auth/signup"
        element={<NeedNoAuth component={p.Signup} />}
      />

      {/* 404 catch all*/}
      <Route path="*" element={<p.fourOhFour />} />
    </Routes>
  );
};

export default Router;
