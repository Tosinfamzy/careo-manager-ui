import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";

import Login from "../pages/Login";

jest.mock("axios");

describe("Login", () => {
  it("renders login form correctly", () => {
    const { getByLabelText, getByText } = render(<Login />);

    expect(getByLabelText("Enter your email")).toBeInTheDocument();
    expect(getByLabelText("Enter your password")).toBeInTheDocument();
    expect(getByText("Login")).toBeInTheDocument();
  });

  it("handles login form submission", async () => {
    const { getByLabelText, getByText } = render(<Login />);

    const emailInput = getByLabelText("Enter your email");
    const passwordInput = getByLabelText("Enter your password");
    const loginButton = getByText("Login");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.click(loginButton);

    expect(axios.post).toHaveBeenCalledWith(
      `${import.meta.env.VITE_API_URL}/auth/login`,
      { email: "test@example.com", password: "password" }
    );

    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith(
        "access_token",
        expect.any(String)
      );
      expect(localStorage.setItem).toHaveBeenCalledWith(
        "refresh_token",
        expect.any(String)
      );
      expect(window.location.href).toBe("/tasks");
    });
  });
});
