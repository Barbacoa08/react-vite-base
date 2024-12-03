import { axe } from "jest-axe";
import { render, screen } from "test-utils";
import { Todos } from ".";

describe("Todos component", () => {
	it("opens without exploding", () => {
		render(<Todos />);

		expect(screen.getByRole("main")).toBeDefined();
	});

	it("passes basic axe compliance", async () => {
		const { container } = render(<Todos />);
		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});
});
