import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home/Home";
import Auth from "./pages/Authentication/Auth";
import NotFound from "./pages/NotFound/NotFound";
import Menu from "./pages/Menu/Menu";
import Location from "./pages/Location/Location";
import Layout from "./components/Layout";
import { ROUTES } from "./constants/routes";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path={ROUTES.HOME}
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path={ROUTES.MENU}
          element={
            <Layout>
              <Menu />
            </Layout>
          }
        />
        <Route
          path={ROUTES.LOCATION}
          element={
            <Layout>
              <Location />
            </Layout>
          }
        />
       

        {/* Auth Route */}
        <Route path={ROUTES.AUTH} element={<Auth />} />

        {/* Redirect unknown routes to 404 page */}
        <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
