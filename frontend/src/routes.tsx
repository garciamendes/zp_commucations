import { createBrowserRouter } from "react-router-dom";
import { Welcome } from "./containers/welcome";
import ErrorPage from "./containers/error-page";
import { Login } from "./containers/Auth/Login";
import { Register } from "./containers/Auth/register";
import Home from "./containers/home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ]
  },
  {
    path: '/home',
    element: <Home />,
    errorElement: <ErrorPage />,
  }
])