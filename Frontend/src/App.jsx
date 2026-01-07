import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/ui/authentication/Login";
import Register from "./components/ui/authentication/Register";
import Home from "./components/ui/components_lite/Home";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
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