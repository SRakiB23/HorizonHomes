import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./routes/Root";
import { ToastContainer } from "react-toastify";
import HomePage from "./pages/HomePage/HomePage";
import AuthProvider from "./providers/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AllProperties from "./pages/AllProperties/AllProperties";
import Login from "./pages/Login/Login";
import PropertyDetails from "./PropertyDetails/PropertyDetails";
import Register from "./pages/Registration/Registration";
import Dashboard from "./Dashboard/Dashboard";
import Profile from "./pages/Profile/Profile";
import WishList from "./pages/WishList/WishList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <HomePage></HomePage>,
      },
      {
        path: "allProperties",
        element: <AllProperties></AllProperties>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "propertyDetails/:id",
        element: <PropertyDetails></PropertyDetails>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "profile",
        element: <Profile></Profile>,
      },
      {
        path: "dashboard",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "wishlist",
        element: <WishList></WishList>,
      },
    ],
  },
  // {
  //   path: "dashboard",
  //   element: <Dashboard></Dashboard>,
  //   children: [
  //     // normal user routes
  //     {
  //       path: "profile",
  //       element: <Profile></Profile>,
  //     },
  //   ],
  // },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <div>
          <RouterProvider router={router} />
        </div>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
