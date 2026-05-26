import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import MainLayout
from "../layouts/MainLayout";

import HomePage
from "../pages/HomePage";

import LoginPage
from "../pages/LoginPage";

import RegisterPage
from "../pages/RegisterPage";

import DashboardPage
from "../pages/DashboardPage";

import TransactionsPage
from "../pages/TransactionsPage";

import ReportsPage
from "../pages/ReportsPage";

import GoalsPage
from "../pages/GoalsPage";

import ProtectedRoute
  from "./ProtectedRoute";

import ProfilePage
from "../pages/ProfilePage";

function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          element={<MainLayout />}
        >

          {/* PUBLIC ROUTES */}

          <Route
            path="/"
            element={<HomePage />}
          />

          <Route
            path="/login"
            element={<LoginPage />}
          />

          <Route
            path="/register"
            element={<RegisterPage />}
          />

          {/* PROTECTED ROUTES */}

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>

                <DashboardPage />

              </ProtectedRoute>
            }
          />

          <Route
            path="/transactions"
            element={
              <ProtectedRoute>

                <TransactionsPage />

              </ProtectedRoute>
            }
          />

          <Route
            path="/reports"
            element={
              <ProtectedRoute>

                <ReportsPage />

              </ProtectedRoute>
            }
          />

          <Route
            path="/goals"
            element={
              <ProtectedRoute>

                <GoalsPage />

              </ProtectedRoute>
            }
          />

          <Route
  path="/profile"
  element={
    <ProtectedRoute>

      <ProfilePage />

    </ProtectedRoute>
  }
/>

          {/* FALLBACK */}

          <Route
            path="*"
            element={
              <Navigate
                to="/"
                replace
              />
            }
          />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default AppRoutes;