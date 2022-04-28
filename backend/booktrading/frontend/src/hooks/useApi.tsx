import { useContext } from "react";
import { ApiContext } from "../context";

export const useApi = () => {
  return useContext(ApiContext);
};
