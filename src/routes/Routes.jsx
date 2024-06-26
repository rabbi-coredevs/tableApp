import { Navigate, createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Admin from "../components/Admin";
import Message from "../components/message/Message";
import Bot from "../components/BOT CMS/Bot";
import Statistics from "../components/statistics/Statistics";
import LoginPage from "../components/LoginPage";
import { useContext } from "react";
import { AuthContext } from "../components/AuthProvider";
import ResetPassword from "../components/ResetPassword";
import NotFound from "../components/ NotFound/NotFound";
import AddDivDynamically from "../components/AddDivDynamically";
import Clients from "../components/ForgotPass/Clients";
import CustomTimePicker from "../components/message/CustomTimePicker";
import Zip from "../components/Zip";
import SearchComp from "../components/ NotFound/SearchComp";
import Alerts from "../components/ForgotPass/Alerts";
import AlertModal from "../components/ForgotPass/AlertModal";
import Review from "../components/ForgotPass/samian/Review";


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
    index:true,
    element: <LoginPage />,
  },
  {
    path:'/forgot-password/:token',
    element: <ResetPassword/>,
  },{
    path:'*',
    element: <NotFound/>,
  },
  // {
  //   path:'/search',
  //   element:<SearchComp/>
  // }
  // ,{
  //   path:'/alerts',
  //   element:<AlertModal/>
  // },
  // {
  //   path:'/div',
  //   element:<Review/>
  // },
//  {
//    path:'/time',
//    element:<CustomTimePicker/>
//  },
//  {
//   path:'/zip',
//   element:<Zip/>
//  }
]);
