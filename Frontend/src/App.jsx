<<<<<<< HEAD
import { createBrowserRouter, RouterProvider } from "react-router-dom";
=======
import ProtectedRoute from "./routes/ProtectedRoute";
import { Button } from "@/components/ui/button"
import Navbar from "./components/ui/components_lite/Navbar"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
>>>>>>> origin/frontend-auth-context
import Login from "./components/ui/authentication/Login";
import Register from "./components/ui/authentication/Register";
import Home from "./components/ui/components_lite/Home";

<<<<<<< HEAD
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
=======


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

>>>>>>> origin/frontend-auth-context
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;