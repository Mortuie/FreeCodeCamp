import { useModal } from "../hooks";
import LoadingModal from "./LoadingModal";
import { ModalType } from "../types";
import React from "react";

type EnumDictionary<T extends string | symbol | number, U> = {
  [K in T]: U;
};

const m: EnumDictionary<ModalType, React.FC> = {
  [ModalType.NONE]: () => <div>Placeholder</div>,
  [ModalType.LOADING]: LoadingModal,
};

const Modals = () => {
  const { modalType } = useModal();

  const Modal = m[modalType];

  return <Modal />;
};

export default Modals;
