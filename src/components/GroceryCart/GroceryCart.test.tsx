import { axe } from "jest-axe";
import { render, screen, userEvent } from "test-utils";
import { GroceryCart } from ".";

describe("GroceryCart component", () => {
	const user = userEvent.setup();

	const emptyCartText = "No items selected";
	const cartHasItemsText = "Complete checkout?";
	const gushersOutOfStockText = "Gushers: 0 remaining";

	const addBananasBtnLabel = "add one Bananas";
	const removeBananasBtnLabel = "remove one Bananas";
	const addGushersBtnLabel = "add one Gushers";
	const removeGushersBtnLabel = "remove one Gushers";

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

		const addBananaBtn = screen.getByLabelText(addBananasBtnLabel);
		await user.click(addBananaBtn);

		expect(screen.getByText("Bananas: 9 remaining")).toBeDefined();
		expect(screen.getByText("Bananas: 1 in Cart")).toBeDefined();
	});

	it("appropriately removes an item from the cart", async () => {
		render(<GroceryCart />);

		const addBananaBtn = screen.getByLabelText(addBananasBtnLabel);
		await user.click(addBananaBtn);
		expect(screen.getByText("Bananas: 1 in Cart")).toBeDefined();

		const removeBananaBtn = screen.getByLabelText(removeBananasBtnLabel);
		await user.click(removeBananaBtn);
		expect(() => screen.getByText("Bananas: 1 in Cart")).toThrow();
	});

	it("shows zero items for an item in the shop, and does not show zero items in the cart", async () => {
		const gushersCartText = "Gushers: 1 in Cart";
		const gushersInStockText = "Gushers: 1 remaining";

		render(<GroceryCart />);

		// gushers is in stock and not in cart
		expect(screen.getByText(gushersInStockText)).toBeDefined();
		expect(() => screen.getByText(gushersCartText)).toThrow();

		// add gushers to cart
		const addGushersBtn = screen.getByLabelText(addGushersBtnLabel);
		await user.click(addGushersBtn);

		// gushers are out of stock and in cart
		expect(screen.getByText(gushersOutOfStockText)).toBeDefined();
		expect(screen.getByText(gushersCartText)).toBeDefined();

		// put gushers back
		const removeGushersBtn = screen.getByLabelText(removeGushersBtnLabel);
		await user.click(removeGushersBtn);

		// gushers are back in stock and not in cart
		expect(screen.getByText(gushersInStockText)).toBeDefined();
		expect(() => screen.getByText(gushersCartText)).toThrow();
	});

	it("selecting 'checkout' removes all items from cart", async () => {
		render(<GroceryCart />);

		expect(screen.getByText(emptyCartText)).toBeDefined();

		await user.click(screen.getByLabelText(addBananasBtnLabel));
		await user.click(screen.getByLabelText(addGushersBtnLabel));

		expect(() => screen.getByText(emptyCartText)).toThrow();
		expect(screen.getByText(cartHasItemsText)).toBeDefined();

		await user.click(screen.getByText("submit checkout"));

		expect(screen.getByText(emptyCartText)).toBeDefined();
		expect(() => screen.getByText(cartHasItemsText)).toThrow();
	});
});
