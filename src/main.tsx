import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { LazyMotion, domAnimation } from "framer-motion";
import App from "./App";
import "./styles/global.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      {/* LazyMotion + domAnimation: carrega só as features usadas (bundle menor) */}
      <LazyMotion features={domAnimation}>
        <App />
      </LazyMotion>
    </HelmetProvider>
  </StrictMode>,
);
