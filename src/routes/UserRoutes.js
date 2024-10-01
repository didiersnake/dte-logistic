import React from "react";
// import UserDashboard from "../pages/UserDashboard";
import NavBar from "../components/NavBar";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import { ErrorPage } from "../components/ErrorPage";
import AddNewFlight from "../pages/Traveler/AddNewFlight";
import { Footer } from "../components/Footer";
import { Profile } from "../pages/Profile";
import { ReadMyFlights } from "../pages/Traveler/ReadMyFlights";
import { Carriers } from "../pages/carriers/Carriers";
import { globalConstants } from "../constants/global";
import { FloatingButton } from "../components/FloatingButton";
import { Bookings } from "../pages/Bookings";

export default function UserRoutes({ isLoggedOut, user }) {
  let isTraveler = user?.role === globalConstants.userRole[2];

  return (
    <div>
      <NavBar>
        <Routes>
          <Route
            path="/"
            element={<Home isLoggedOut={isLoggedOut} user={user} />}
          />

          <Route path="/orders" element={<Bookings user={user} />} />
          <Route path="/carriers" element={<Carriers user={user} />} />
          <Route
            path="/my-flights"
            element={
              <div>
                <ReadMyFlights user={user} />
              </div>
            }
          />
          <Route
            path="/profile"
            element={
              <div>
                <Profile user={user} />
              </div>
            }
          />

          {/* Traveler Roiutes */}
          <Route
            path="/new-flight"
            element={
              <div>
                <AddNewFlight user={user} />
              </div>
            }
          />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </NavBar>
      <FloatingButton isTravler={isTraveler} />
      <Footer isLoggedOut={isLoggedOut} user={user} />
    </div>
  );
}
