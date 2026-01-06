import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// Global Font Imports (DRY Principle - imported once)
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/playfair-display/700.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App.jsx";
import { setAuthToken } from "./api";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter(
  [
    {
      path: "/*",
      element: <App />,
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_startTransition: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
    },
  }
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      {/** restore token from localStorage so axios has header for requests */}
      {(() => {
        const token = localStorage.getItem('token');
        if (token) setAuthToken(token);
        return null;
      })()}
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
