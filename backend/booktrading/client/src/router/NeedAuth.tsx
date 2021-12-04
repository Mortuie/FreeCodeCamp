import React from "react";
import { Navigate } from "react-router";
import { useUser } from "../hooks";
import { Props } from "./types";

const NeedAuth: React.FC<Props> = ({
  component: RouteComponent,
  redirectPath = "/",
}) => {
  const { isLoggedIn } = useUser();

  if (isLoggedIn) {
    return <RouteComponent />;
  }

  return <Navigate to={redirectPath} />;
};

export default NeedAuth;
