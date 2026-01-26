import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from "redux-persist";
import "./index.css";
import App from "./App";
import AuthProvider from "./context/AuthContext";
import { JobProvider } from "./context/JobContext";
import store from "./redux/store";

let persistor = persistStore(store);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          <JobProvider>
            <App />
          </JobProvider>
        </AuthProvider>
      </PersistGate>
    </Provider>
  </StrictMode >
);
