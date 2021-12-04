import { Route, Routes } from "react-router";
import * as p from "../pages";
import NeedAuth from "./NeedAuth";
import NeedNoAuth from "./NeedNoAuth";

const Router = () => {
  return (
    <Routes>
      {/* public routes you can also be logged in to see*/}
      <Route path="/" element={<p.Dashboard />}></Route>

      {/* private routes */}
      {/* <Route
        path="/private"
        element={<PrivateRoute component={} redirectPath="/about" />}
      /> */}

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
