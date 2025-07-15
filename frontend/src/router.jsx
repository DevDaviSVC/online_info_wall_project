import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomeLayout from "./pages/HomeLayout";
import AddAssignment from "./pages/AddAssignment";
import Login from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
        {
            index: true,
            element: <App />,
        },
        {
            path: "add",
            element: <AddAssignment />
        }
    ]
  },
  {
    path: "/login",
    element: <Login />
  }
]);

export default router;
