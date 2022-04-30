import { Routes } from "react-router-dom";
import "./App.scss";
import { appRoutes, renderRoutes } from "./App.routes";
import ErrorBoundary from "./utils/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <Routes>{renderRoutes(appRoutes)}</Routes>
    </ErrorBoundary>
  );
}

export default App;
