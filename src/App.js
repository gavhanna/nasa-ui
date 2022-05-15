import { Routes } from "react-router-dom";
import "./App.scss";
import { appRoutes, renderRoutes } from "./App.routes";

function App() {
  return <Routes>{renderRoutes(appRoutes)}</Routes>;
}

export default App;
