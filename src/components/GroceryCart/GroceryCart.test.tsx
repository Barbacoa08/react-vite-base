import { axe } from "jest-axe";
import { render, screen } from "test-utils";
import { GroceryCart } from ".";

describe("GroceryCart component", () => {
	it("opens without exploding", () => {
		render(<GroceryCart />);

		expect(screen.getByRole("main")).toBeDefined();
	});

	it("passes basic axe compliance", async () => {
		const { container } = render(<GroceryCart />);
		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});
});
