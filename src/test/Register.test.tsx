import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import { describe, it, expect, vi } from "vitest";

import Register from "../pages/Register";

vi.mock("axios");

describe("Register", () => {
  it("renders registration form correctly", () => {
    const { getByLabelText, getByText } = render(<Register />);

    expect(getByLabelText("Enter your email")).toBeInTheDocument();
    expect(getByLabelText("Enter your username")).toBeInTheDocument();
    expect(getByLabelText("Enter your password")).toBeInTheDocument();
    expect(getByLabelText("Confirm your password")).toBeInTheDocument();
    expect(getByText("Register")).toBeInTheDocument();
  });

  it("handles registration form submission", async () => {
    const { getByLabelText, getByText } = render(<Register />);

    const emailInput = getByLabelText("Enter your email");
    const usernameInput = getByLabelText("Enter your username");
    const passwordInput = getByLabelText("Enter your password");
    const confirmPasswordInput = getByLabelText("Confirm your password");
    const registerButton = getByText("Register");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "password" } });
    fireEvent.click(registerButton);

    expect(axios.post).toHaveBeenCalledWith(
      `${import.meta.env.VITE_API_URL}/auth/register`,
      {
        email: "test@example.com",
        password: "password",
        username: "testuser",
      }
    );

    vi.spyOn(localStorage, "setItem");

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
