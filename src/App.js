import { Routes } from "react-router-dom";
import "./App.scss";
import { appRoutes, renderRoutes } from "./App.routes";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Provider store={store}>
      <Routes>{renderRoutes(appRoutes)}</Routes>
      <ToastContainer />
    </Provider>
  );
}

export default App;
