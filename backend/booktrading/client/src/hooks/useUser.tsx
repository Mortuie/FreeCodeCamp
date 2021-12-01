import { useContext } from "react";
import { userContext } from "../context";

export const useUser = () => {
  return useContext(userContext);
};
