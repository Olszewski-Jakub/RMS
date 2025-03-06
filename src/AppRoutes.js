import React from "react";
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";

import HashNavigationWrapper from "./components/Navigation/HashNavigationWrapper";
import Auth from "./pages/Authentication/Auth";
import NotFound from "./pages/NotFound/NotFound";
import Layout from "./components/Layout/Layout";
import {ROUTES} from "./constants/routes";
import Profile from "./pages/Profile/Profile";
import ProtectedRoute from "./ProtectedRoute";
import RestaurantDashboard from "./pages/Dashboard/Dashboard";
import ForgotPassword from "./pages/Authentication/ForgotPassword";

function AppRoutes() {
    return (
        <Router>
            <Routes>
                {/* Main route with HashNavigationWrapper */}
                <Route
                    path={ROUTES.HOME}
                    element={
                        <Layout>
                            <HashNavigationWrapper />
                        </Layout>
                    }
                />

                {/* Redirect legacy routes to hash-based navigation */}
                <Route
                    path={ROUTES.MENU}
                    element={<Navigate to="/#Menu" replace />}
                />
                <Route
                    path={ROUTES.LOCATION}
                    element={<Navigate to="/#Location" replace />}
                />
                <Route
                    path={ROUTES.RESERVE_TABLE}
                    element={<Navigate to="/#Reservation" replace />}
                />

                {/* Non-hash based routes remain the same */}
                <Route
                    path={ROUTES.PROFILE}
                    element={
                        <Layout>
                            <Profile />
                        </Layout>
                    }
                />

                {/* Auth Route */}
                <Route path={ROUTES.AUTH} element={<Auth />} />
                <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
                {/* Admin Dashboard */}
                <Route path={ROUTES.ADMIN} element={<ProtectedRoute roles={['owner', 'employee']} />}>
                    <Route index element={<RestaurantDashboard />} />
                </Route>

                {/* Redirect unknown routes to 404 page */}
                <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;