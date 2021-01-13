import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

async function main() {
  if (import.meta.env.DEV) {
    const { worker } = await import("./mocks/browser");
    worker.start();
  }

  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );
}

main();
