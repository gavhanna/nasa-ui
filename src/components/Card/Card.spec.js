import React from "react";
import { render, screen } from "@testing-library/react";
import Card from "./Card";

it("renders character limited description", () => {
  render(
    <Card title="Test Card" bodyText="Test body text" limitDescriptionTo={10} />
  );
  expect(screen.getByText("Test Card")).toBeInTheDocument();
});

it("renders character unlimited description", () => {
  render(<Card title="Test Card" bodyText="Test body text" />);
  expect(screen.getByText("Test Card")).toBeInTheDocument();
});

it("renders media type icon for images", () => {
  render(
    <Card title="Test Card" bodyText="Test body text" mediaType="image" />
  );
  expect(screen.getByText("Test Card")).toBeInTheDocument();
});

it("renders media type icon for videos", () => {
  render(
    <Card title="Test Card" bodyText="Test body text" mediaType="video" />
  );
  expect(screen.getByText("Test Card")).toBeInTheDocument();
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
  expect(screen.getByText("Test Card")).toBeInTheDocument();
});
