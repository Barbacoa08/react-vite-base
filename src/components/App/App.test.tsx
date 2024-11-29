import { axe } from "jest-axe";
import { render, screen } from "test-utils";
import { App } from "./";

describe("Checkout component", () => {
	it("opens without exploding", () => {
		render(<App />);

		expect(screen.getByRole("main")).toBeDefined();
	});

	it("passes basic axe compliance", async () => {
		const { container } = render(<App />);
		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});
});
