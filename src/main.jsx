import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import App from "./App";
import StudentsPage from "./pages/StudentsPage";
import InstitutionRegistration from "./pages/Registration";
import WaitingPage from "./pages/WaitingPage";
import Login from "./pages/Login";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";

const router = createBrowserRouter([
  // Public Routes
  { 
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />
    },
      {
        path: "register",
        element: <InstitutionRegistration />
    },
      {
        path: "login",
        element: <Login />
    },
      {
        path: "waiting",
        element: <WaitingPage />
    },
      {
        path: "superAdmin",
        element: <SuperAdminDashboard />
    },
      {
        path: "StudentsPage",
        element: <StudentsPage />
    }
    ]
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </StrictMode>
);
