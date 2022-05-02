import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { render } from "@testing-library/react";

it("renders without crashing", () => {
  render(<App />);
});
