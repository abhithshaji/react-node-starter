import { describe, it } from "vitest";
import { render } from "@testing-library/react";
import App from "@/App.tsx";

describe("App", () => {
  it("App Renders", () => {
    render(<App />);
  });
});
