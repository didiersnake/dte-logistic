import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import CreateUser from "../pages/CreateUser";
import Login from "../pages/Login";
import NavBar from "../components/NavBar";
import { ErrorPage } from "../components/ErrorPage";
import { Footer } from "../components/Footer";

export default function NonUserRoutes({isLoggedOut, user}) {
  return (
    <div>
      <NavBar>
        <Routes>
          <Route
            path="/"
            element={<Home isLoggedOut={isLoggedOut} user={user} />}
          />
          <Route path="/create-user" element={<CreateUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </NavBar>
      <Footer isLoggedOut={isLoggedOut} user={user} />
    </div>
  );
}