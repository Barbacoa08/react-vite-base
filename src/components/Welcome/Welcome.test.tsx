import { axe } from "jest-axe";
import { render, screen } from "test-utils";
import { Welcome } from ".";

describe("Welcome component", () => {
	it("opens without exploding", () => {
		render(<Welcome />);

		expect(screen.getByRole("main")).toBeDefined();
	});

	it("passes basic axe compliance", async () => {
		const { container } = render(<Welcome />);
		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});
});
