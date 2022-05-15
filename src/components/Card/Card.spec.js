import { render, screen } from "@testing-library/react";
import Card from "./Card";

it("renders character limited description", () => {
  render(
    <Card
      title="Test Card"
      bodyText="This is a longer body text with more than 10 words"
      limitDescriptionTo={10}
    />
  );
  expect(
    screen.getByText("This is a longer body text with more than 10...")
  ).toBeInTheDocument();
});

it("renders character unlimited description", () => {
  render(<Card title="Test Card" bodyText="Test body text" />);
});

it("renders media type icon for images", () => {
  render(
    <Card title="Test Card" bodyText="Test body text" mediaType="image" />
  );
});

it("renders media type icon for videos", () => {
  render(
    <Card title="Test Card" bodyText="Test body text" mediaType="video" />
  );
});

it("renders image if available", () => {
  render(
    <Card
      title="Test Card"
      bodyText="Test body text"
      imgSrc="https://testimage.test"
      subtitle="Test subtitle"
      linkTo="/test"
    />
  );
});
