import ProtectedRoute from "./routes/ProtectedRoute";
import PageTransitionLayout from "./components/layout/PageTransitionLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./components/ui/authentication/Login";
import Register from "./components/ui/authentication/Register";
import Home from "./components/ui/components_lite/Home";
import Profile from "./components/ui/components_lite/Profile";
import CreateProfile from "./components/ui/components_lite/CreateProfile";
import EditProfile from "./components/ui/components_lite/EditProfile";
import CreateEmployerProfile from "./components/ui/components_lite/CreateEmployerProfile";
import EditEmployerProfile from "./components/ui/components_lite/EditEmployerProfile";
import Description from "./components/ui/components_lite/Description";
import CreateJob from "./components/ui/components_lite/CreateJob";
import EditJob from "./components/ui/components_lite/EditJob";
import Browse from "./components/ui/components_lite/Browse";
import Jobs from "./components/ui/components_lite/Jobs";
import { Toaster } from "sonner";


// creating browser based router
const appRouter = createBrowserRouter([ //configuration based routing(Array of routes)
  {
    path: "/",
    element: <PageTransitionLayout />,
    children: [
      {
        path: "/",
        element: <Home />
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
        path: "/browse",
        element: <Browse />
      },
      {
        path: "/jobs",
        element: <Jobs />
      },
      {
        path: "/description/:id",
        element: <Description />
      },
      {
        path: "/profile",
        element: <Profile />
      },
      {
        path: "/create-profile",
        element: <CreateProfile />
      },
      {
        path: "/edit-profile",
        element: <EditProfile />
      },
      {
        path: "/create-employer-profile",
        element: <CreateEmployerProfile />
      },
      {
        path: "/edit-employer-profile",
        element: <EditEmployerProfile />
      },
      {
        path: "/create-job",
        element: <CreateJob />
      },
      {
        path: "/edit-job/:id",
        element: <EditJob />
      }
    ]
  }
]);

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster richColors position="top-center" />
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;