import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useModal, useUser } from "../hooks";
import Modals from "../modals";
import { Dashboard, Login, Register, Logout, NewBook, Profile } from "../pages";
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
        <Route path="/profile/:id" element={<Profile />} />
        <Route element={<NeedNoAuthRoute user={user} />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<NeedAuthRoute user={user} />}>
          <Route path="/logout" element={<Logout />} />
          <Route path="/books/new" element={<NewBook />} />
          <Route path="/profile" element={<Profile self />} />
        </Route>
      </Routes>
      {isModalOpen && <Modals />}
    </BrowserRouter>
  );
};

export { Router };
