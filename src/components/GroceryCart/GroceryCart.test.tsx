import { axe } from "jest-axe";
import { render, screen, userEvent } from "test-utils";
import { GroceryCart } from ".";

describe("GroceryCart component", () => {
	const user = userEvent.setup();

	it("opens without exploding", () => {
		render(<GroceryCart />);

		expect(screen.getByRole("main")).toBeDefined();
	});

	it("passes basic axe compliance", async () => {
		const { container } = render(<GroceryCart />);
		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});

	it("appropriately adds an item to the cart", async () => {
		render(<GroceryCart />);

		expect(screen.getByText("Bananas: 10 remaining")).toBeDefined();

		const addBananaBtn = screen.getByLabelText("add one Bananas");
		await user.click(addBananaBtn);

		expect(screen.getByText("Bananas: 9 remaining")).toBeDefined();
		expect(screen.getByText("Bananas: 1 in Cart")).toBeDefined();
	});

	it("appropriately removes an item from the cart", async () => {
		render(<GroceryCart />);

		const addBananaBtn = screen.getByLabelText("add one Bananas");
		await user.click(addBananaBtn);
		expect(screen.getByText("Bananas: 1 in Cart")).toBeDefined();

		const removeBananaBtn = screen.getByLabelText("remove one Bananas");
		await user.click(removeBananaBtn);
		expect(() => screen.getByText("Bananas: 1 in Cart")).toThrow();
	});

	// it("shows zero items for an item in the shop", async () => {});

	// it("does not show zero items in the cart", async () => {});
});
