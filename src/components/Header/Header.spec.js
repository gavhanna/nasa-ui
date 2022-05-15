import "../../utils/matchMedia.mock";
import { render } from "@testing-library/react";
import Header from "./Header";

it("renders header with subnav", () => {
  render(
    <Header
      sectionRoutes={[
        {
          name: "Home",
          path: "/",
        },
      ]}
    />
  );
});

it("renders header without subnav", () => {
  render(<Header />);
});
