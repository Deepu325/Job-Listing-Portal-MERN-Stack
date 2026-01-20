import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import AuthProvider from "./context/AuthContext";
import { JobProvider } from "./context/JobContext";
import store from "./redux/store"; // ✅ DEFAULT IMPORT

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <JobProvider>
          <App />
        </JobProvider>
      </AuthProvider>
    </Provider>
  </StrictMode>
);
