import ProtectedRoute from "./routes/ProtectedRoute";
import Navbar from "./components/ui/components_lite/Navbar"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./components/ui/authentication/Login";
import Register from "./components/ui/authentication/Register";
import Home from "./components/ui/components_lite/Home";
import Profile from "./components/ui/components_lite/Profile";
import Description from "./components/ui/components_lite/Description";


// creating browser based router
const appRouter = createBrowserRouter([ //configuration based routing(Array of routes)
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    )
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/description/:id",
    element: <Description/>
  },
  {
  path: "/profile",
  element: <Profile />
  }

]);

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;