import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useModal, useUser } from "../hooks";
import Modals from "../modals";
import { Dashboard, Login, Register } from "../pages";
import { NeedAuthRoute, NeedNoAuthRoute } from "./RouteTypes";

interface Props {
  children: React.ReactNode;
}

const Router = ({ children }: Props) => {
  const { isModalOpen } = useModal();
  const { user } = useUser();

  return (
    <BrowserRouter>
      {children}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route element={<NeedNoAuthRoute user={user} />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
      {isModalOpen && <Modals />}
    </BrowserRouter>
  );
};

export { Router };
