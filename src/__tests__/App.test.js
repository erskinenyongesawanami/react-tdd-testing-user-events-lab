import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';

import App from "../App";

// Portfolio Elements
test("displays a top-level heading with the text `Hi, I'm _______`", () => {
  render(<App />);

  const topLevelHeading = screen.getByRole("heading", {
    name: /hi, i'm/i,
    exact: false,
    level: 1,
  });

  expect(topLevelHeading).toBeInTheDocument();
});

test("displays an image of yourself", () => {
  render(<App />);

  const image = screen.getByAltText("My profile pic");

  expect(image).toHaveAttribute("src", "https://via.placeholder.com/350");
});

test("displays second-level heading with the text `About Me`", () => {
  render(<App />);

  const secondLevelHeading = screen.getByRole("heading", {
    name: /about me/i,
    level: 2,
  });

  expect(secondLevelHeading).toBeInTheDocument();
});

test("displays a paragraph for your biography", () => {
  render(<App />);

  const bio = screen.getByText(/lorem ipsum/i);

  expect(bio).toBeInTheDocument();
});

test("displays the correct links", () => {
  render(<App />);

  const githubLink = screen.getByRole("link", {
    name: /github/i,
  });
  const linkedinLink = screen.getByRole("link", {
    name: /linkedin/i,
  });

  expect(githubLink).toHaveAttribute(
    "href",
    expect.stringContaining("https://github.com")
  );

  expect(linkedinLink).toHaveAttribute(
    "href",
    expect.stringContaining("https://linkedin.com")
  );
});

// Newsletter Form - Initial State
test("the form includes text inputs for name and email address", () => {
  render(<App />);
  
  expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
});

test("the form includes three checkboxes to select areas of interest", () => {
  render(<App />);

  expect(screen.getByLabelText(/coding/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/design/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/marketing/i)).toBeInTheDocument();
});

test("the checkboxes are initially unchecked", () => {
  render(<App />);

  expect(screen.getByLabelText(/coding/i)).not.toBeChecked();
  expect(screen.getByLabelText(/design/i)).not.toBeChecked();
  expect(screen.getByLabelText(/marketing/i)).not.toBeChecked();
});

import userEvent from "@testing-library/user-event";

test("the page shows information the user types into the name and email address form fields", async () => {
  render(<App />);
  const user = userEvent.setup();

  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);

  await user.type(nameInput, "Moha");
  await user.type(emailInput, "moha@example.com");

  expect(nameInput).toHaveValue("Moha");
  expect(emailInput).toHaveValue("moha@example.com");
});

test("checked status of checkboxes changes when user clicks them", async () => {
  render(<App />);
  const user = userEvent.setup();

  const coding = screen.getByLabelText(/coding/i);
  const design = screen.getByLabelText(/design/i);

  expect(coding).not.toBeChecked();
  expect(design).not.toBeChecked();

  await user.click(coding);
  await user.click(design);

  expect(coding).toBeChecked();
  expect(design).toBeChecked();

  await user.click(design);
  expect(design).not.toBeChecked();
});

test("a message is displayed when the user clicks the Submit button", async () => {
  render(<App />);
  const user = userEvent.setup();

  await user.type(screen.getByLabelText(/name/i), "Moha");
  await user.type(screen.getByLabelText(/email/i), "moha@example.com");
  await user.click(screen.getByLabelText(/coding/i));
  await user.click(screen.getByRole("button", { name: /submit/i }));

  expect(screen.getByText(/thank you for signing up, moha/i)).toBeInTheDocument();
  expect(screen.getByText(/we’ll email you at moha@example.com/i)).toBeInTheDocument();
  expect(screen.getByText(/your interests: coding/i)).toBeInTheDocument();
});

