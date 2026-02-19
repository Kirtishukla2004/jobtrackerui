import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SidebarLayout from "./layouts/SidebarLayout/SidebarLayout";
import Dashboard from "./pages/Dashboard";
import JobMentor from "./pages/JobMentor";
import Resume from "./pages/Resume";
import QueriesAndFeedback from "./pages/QueriesAndFeedback";
import ProtectedRoute from "./utils/ProtectedRoutes";
import AuthPage from "./pages/AuthPage";
import { NoRoute } from "./components/NoRoute";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  const router = createBrowserRouter([
    {
      path: "/subscribe",
      element: <AuthPage />,
    },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <SidebarLayout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <Dashboard /> },
        { path: "resume", element: <Resume /> },
        { path: "jobmentor", element: <JobMentor /> },
        { path: "queries", element: <QueriesAndFeedback /> },
      ],
    },
    { path: "*", element: <NoRoute /> },
    { path: "/forgotpassword", element: <ForgotPassword /> },
    { path: "/resetpassword", element: <ResetPassword /> },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
