import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

import Home from "./pages/Home/Home.js";
import Auth from "./pages/Authentication/Auth.js";
import OwnerDB from "./pages/Dashboard/OwnerDB.js";
import CustomerDB from "./pages/Dashboard/CustomerDB.js";
import NotFound from "./pages/NotFound/NotFound.js";
import Menu from "./pages/Menu/Menu.js";

import { ROUTES } from "./constants/routes.js";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.MENU} element={<Menu />} />
        <Route path={ROUTES.OWNERDB} element={<OwnerDB />} />
        <Route path={ROUTES.CUSTOMERDB} element={<CustomerDB />} />

        {/* Auth Routes */}
        <Route path={ROUTES.AUTH} element={<Auth />} />

        {/* Redirect unknown routes to 404 page */}
        <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
      </Routes>
    </Router>
  );
}


export default AppRoutes;