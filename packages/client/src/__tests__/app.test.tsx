import { describe, it } from "vitest";
import { render } from "@testing-library/react";
import App from "@/App.tsx";
import { MemoryRouter } from "react-router";

describe("App", () => {
  it("App Renders", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
  });
});
