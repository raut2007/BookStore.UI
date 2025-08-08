import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import BookOrderApp from "./BookOrder.tsx";
import NewBookOrderApp from "./NewBookOrdedr.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <App /> */}
    {/* <BookOrderApp></BookOrderApp> */}
    <NewBookOrderApp />
  </StrictMode>
);
