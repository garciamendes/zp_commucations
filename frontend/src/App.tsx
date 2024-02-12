import { Toaster } from "sonner";
import { Login } from "./containers/Auth/Login";
import { Register } from "./containers/Auth/register";
import ErrorPage from "./containers/error-page";
import { Home } from "./containers/home";
import { GlobalStyle } from "./styles/global"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserProvider } from "./contexts/userContext";

export const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
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
    }
  ])

  return (
    <UserProvider>
      <GlobalStyle />
      <Toaster position="top-right" richColors />
      <RouterProvider router={router} />
    </UserProvider>
  )
}
