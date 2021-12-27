import React from "react";
import { Navigate } from "react-router";
import { useUser } from "../hooks";
import { Props } from "./types";

const NeedAuth: React.FC<Props> = ({
  component: RouteComponent,
  redirectPath = "/",
}) => {
  const { user } = useUser();

  if (user) {
    return <RouteComponent />;
  }

  return <Navigate to={redirectPath} />;
};

export default NeedAuth;
