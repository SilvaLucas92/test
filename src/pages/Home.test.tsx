import { render, screen, fireEvent } from "@testing-library/react";
import Home from "./index";
import "@testing-library/jest-dom";

describe("Home component", () => {
  it("opens and closes the Filters modal", () => {
    render(<Home />);

    expect(screen.queryByRole("dialog")).toBeNull();

    fireEvent.click(screen.getByText("Filters"));

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("close-button"));

    expect(screen.queryByRole("dialog")).toBeNull();
  });
});
