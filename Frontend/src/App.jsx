import ProtectedRoute from "./routes/ProtectedRoute";
import { Button } from "@/components/ui/button"
import Navbar from "./components/ui/components_lite/Navbar"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./components/ui/authentication/Login";
import  Register from "./components/ui/authentication/Register"
import Home from "./components/ui/components_lite/Home";



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
    path:"/login",
    element: <Login/>
  },
  {
    path:"/register",
    element: <Register/>
  },
]);

function App() {
  return (
    <div>
        <RouterProvider router = {appRouter}></RouterProvider>
    </div>
  )
}

export default App