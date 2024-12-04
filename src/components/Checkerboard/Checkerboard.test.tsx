import { axe } from "jest-axe";
import { render, screen } from "test-utils";
import { Checkerboard } from ".";

describe("Checkerboard component", () => {
	it("opens without exploding", () => {
		render(<Checkerboard />);

		expect(screen.getByRole("main")).toBeDefined();
	});

	it("passes basic axe compliance", async () => {
		const { container } = render(<Checkerboard />);
		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});
});
