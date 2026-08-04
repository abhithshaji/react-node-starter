import { describe, it } from "vitest";
import { render } from "@testing-library/react";
import Home from "@/app/page";

describe("App", () => {
  it("App Renders", () => {
    render(<Home />);
  });
});
