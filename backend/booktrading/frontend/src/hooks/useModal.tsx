import { useContext } from "react";
import { ModalContext } from "../context";

export const useModal = () => {
  return useContext(ModalContext);
};
