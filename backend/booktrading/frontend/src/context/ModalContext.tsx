import { createContext, FC, ReactNode, useState } from "react";
import { ModalType } from "../types";

interface ModalContextType {
  isModalOpen: boolean;
  startLoading: () => void;
  stopLoading: () => void;
  modalType: ModalType;
}

const ModalContext = createContext({} as ModalContextType);

interface Props {
  children: ReactNode;
}

const sleep = (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

const ModalProvider: FC<Props> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);

  const startLoading = () => {
    setIsModalOpen(true);
    setModalType(ModalType.LOADING);
  };

  const stopLoading = () => {
    sleep(2000).then(() => {
      setIsModalOpen(false);
      setModalType(ModalType.NONE);
    });
  };

  return (
    <ModalContext.Provider
      value={{ isModalOpen, startLoading, stopLoading, modalType }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
