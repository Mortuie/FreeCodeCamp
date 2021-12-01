import { Route, Routes } from "react-router";
import { Dashboard, About, Private } from "../pages";
import PrivateRoute from "./NeedNotAuthRoute";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}></Route>
      <Route path="/about" element={<About />}></Route>
      <Route
        path="/private"
        element={<PrivateRoute component={Private} redirectPath="/about" />}
      />
    </Routes>
  );
};

export default Router;
