import React from "react";
import { Navigate } from "react-router";
import { useUser } from "../hooks";

interface Props {
  component: React.ComponentType;
  redirectPath?: string;
}

const PrivateRoute: React.FC<Props> = ({
  component: RouteComponent,
  redirectPath = "/",
}) => {
  const { user } = useUser();

  if (user) {
    return <RouteComponent />;
  }

  return <Navigate to={redirectPath} />;
};

export default PrivateRoute;
