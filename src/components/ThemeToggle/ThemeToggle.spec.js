import React from "react";
import { render } from "@testing-library/react";
import ThemeToggle from "./ThemeToggle";

it("renders theme toggle", () => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: true,
    })),
  });
  render(<ThemeToggle />);
});
