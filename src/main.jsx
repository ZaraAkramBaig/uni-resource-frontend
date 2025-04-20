import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import App from "./App";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import StudentsPage from "./pages/StudentsPage";

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
        path: "SuperAdminDashboard",
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
