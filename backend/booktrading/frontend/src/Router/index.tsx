import React, { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard, Login, Register } from "../components";

interface Props {
  children: React.ReactNode;
}

const Router: FC<Props> = ({ children }) => {
  return (
    <BrowserRouter>
      {children}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export { Router };
