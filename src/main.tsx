import { createRoot } from "react-dom/client";
import "./index.css";

import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";

import store from "./store/store";
import App from "./App";
import { Toaster } from "components/ui/sonner";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
      <Toaster />
    </Provider>
  </BrowserRouter>
);
