import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { CTAModal } from "./index";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("CTAModal", () => {
  const mockOnClose = jest.fn();

  it("submits form data successfully", async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: { success: true } });

    render(<CTAModal onClose={mockOnClose} />);

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Lucas" },
    });
    fireEvent.change(screen.getByLabelText("Lastname"), {
      target: { value: "Silva" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "lucas@test.com" },
    });
    fireEvent.change(screen.getByLabelText("CTA"), {
      target: { value: "CTA Values" },
    });

    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledTimes(1);
      expect(screen.getByText("CTA submitted")).toBeInTheDocument();
    });

    const expectedPayload = {
      name: "Lucas",
      lastname: "Silva",
      email: "lucas@test.com",
      description: "CTA Values",
    };
    expect(mockedAxios.post).toHaveBeenCalledWith(
      "/api/leads",
      expectedPayload
    );
  });

  it("error message if form fields are empty", async () => {
    render(<CTAModal onClose={mockOnClose} />);

    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(mockOnClose).not.toHaveBeenCalled();
      expect(screen.getByText("All fields are required")).toBeInTheDocument();
    });
  });

  it("error message on API call failure", async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error());

    render(<CTAModal onClose={mockOnClose} />);

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Lucas" },
    });
    fireEvent.change(screen.getByLabelText("Lastname"), {
      target: { value: "Silva" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "lucas@test.com" },
    });
    fireEvent.change(screen.getByLabelText("CTA"), {
      target: { value: "CTA Values" },
    });

    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(mockOnClose).not.toHaveBeenCalled();
      expect(screen.getByText("Something went wrong!")).toBeInTheDocument();
    });
  });
});
