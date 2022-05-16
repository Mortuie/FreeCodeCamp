import { FC } from "react";
import { User } from "../types";
import { Navigate, Outlet } from "react-router-dom";

interface PropsProtectedRoute {
  user: User;
}

const NeedAuthRoute: FC<PropsProtectedRoute> = ({ user }) => {
  if (!user) {
    return <Navigate to={"/"} replace />;
  }

  return <Outlet />;
};

const NeedNoAuthRoute: FC<PropsProtectedRoute> = ({ user }) => {
  if (user) {
    return <Navigate to={"/"} replace />;
  }

  return <Outlet />;
};

export { NeedAuthRoute, NeedNoAuthRoute };
