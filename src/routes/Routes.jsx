import { Navigate, createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Admin from "../components/Admin";
import Message from "../components/message/Message";
import Bot from "../components/BOT CMS/Bot";
import Statistics from "../components/statistics/Statistics";
import LoginPage from "../components/LoginPage";
import { useContext } from "react";
import { AuthContext } from "../components/AuthProvider";


// Create a wrapper component for protected routes
const ProtectedRoute = ({ children }) => {
  const {user} = useContext(AuthContext);
  // If authenticated, render the provided element
  // Otherwise, redirect to the login page
  return user ? children : <Navigate to='/login'/>;
};


// Define your router configuration
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        index: true,
        element:<ProtectedRoute><Admin /></ProtectedRoute>,
      },
      {
        path: "/message",
        element: <ProtectedRoute><Message/></ProtectedRoute>,
      },
      {
        path: "/statistics",
        element: <ProtectedRoute><Statistics /></ProtectedRoute>,
      },
      {
        path: "/bot",
        element: <ProtectedRoute><Bot/></ProtectedRoute>,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);
