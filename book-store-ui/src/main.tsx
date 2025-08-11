import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import BookOrderApp from "./BookOrder.tsx";
import NewBookOrderApp from "./NewBookOrdedr.tsx";
import BookOrder from "./components/BookOrder.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <App /> */}
    {/* <BookOrderApp /> */}
    {/* <NewBookOrderApp /> */}
    <Provider store={store}>
      <BookOrder />
    </Provider>
  </StrictMode>
);
