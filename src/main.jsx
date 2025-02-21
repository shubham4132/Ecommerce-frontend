import { createRoot } from "react-dom/client";
import { Toaster } from "@/components/ui/toaster";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import store from "./store/store";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
      <Toaster />
    </Provider>
  </BrowserRouter>
);
