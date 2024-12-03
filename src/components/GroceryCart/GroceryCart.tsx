import { useCallback, useMemo, useState } from "react";
import "./GroceryCart.css";

type GroceryItemType = "fruit" | "snack";
interface GroceryItem {
	name: string;
	quantity: number;
	type: GroceryItemType;
}
const StartingGroceryItems: GroceryItem[] = [
	{
		name: "Bananas",
		quantity: 10,
		type: "fruit",
	},
	{
		name: "Pears",
		quantity: 30,
		type: "fruit",
	},
	{
		name: "CheezeIts",
		quantity: 13,
		type: "snack",
	},
	{
		name: "Gushers",
		quantity: 1,
		type: "snack",
	},
];

// TODO: "restock" (set numbers back to base, or increment by "Available*")
// TODO: checkout: clear cart

export const GroceryCart = () => {
	const [cart, setCart] = useState<GroceryItem[]>([]);
	const [items, setItems] = useState<GroceryItem[]>(StartingGroceryItems);

	const fruits = useMemo(
		() => items.filter((i) => i.type === "fruit"),
		[items],
	);

	const snacks = useMemo(
		() => items.filter((i) => i.type === "snack"),
		[items],
	);

	const handleAddToCart = useCallback(
		(name: string) => {
			const selectedItemIndex = items.findIndex((i) => i.name === name);
			if (items[selectedItemIndex].quantity <= 0) {
				alert("you can't take a zero items");
				return;
			}

			// take one
			const updatedSelection = [...items];
			updatedSelection[selectedItemIndex].quantity--;
			setItems(updatedSelection);

			// add to cart
			const cartItemIndex = cart.findIndex((c) => c.name === name);
			if (cartItemIndex < 0) {
				setCart([
					...cart,
					{
						name,
						quantity: 1,
						type: updatedSelection[selectedItemIndex].type,
					} satisfies GroceryItem,
				]);
			} else {
				const updatedCart = [...cart];
				updatedCart[cartItemIndex].quantity++;

				setCart(updatedCart);
			}
		},
		[cart, items],
	);

	const handleRemoveFromCart = useCallback(
		(name: string) => {
			const cartItemIndex = cart.findIndex((i) => i.name === name);
			if (cart[cartItemIndex].quantity === 1) {
				setCart(cart.filter((i) => i.name !== name));
			} else {
				const updatedCart = [...cart];
				updatedCart[cartItemIndex].quantity--;
				setCart(updatedCart);
			}

			const selectedItemIndex = items.findIndex((i) => i.name === name);
			const updatedItems = [...items];
			updatedItems[selectedItemIndex].quantity++;
		},
		[cart, items],
	);

	return (
		<main className="grocerycart-container">
			<h1>Grocery Cart</h1>

			<section className="selection">
				<AvailableItems
					title="Fruits"
					items={fruits}
					handleAddToCart={handleAddToCart}
				/>

				<AvailableItems
					title="Snacks"
					items={snacks}
					handleAddToCart={handleAddToCart}
				/>
			</section>

			<section>
				<h2>Checkout area</h2>

				{cart.map((c) => (
					<div key={`checkout-${c.name}`}>
						<span>
							{c.name}: {c.quantity} in Cart
						</span>

						<button
							className="icon-button"
							type="button"
							aria-label={`remove one ${c.name}`}
							onClick={() => handleRemoveFromCart(c.name)}
						>
							❌
						</button>
					</div>
				))}
			</section>
		</main>
	);
};

interface AvailableItemsProps {
	title: string;
	items: GroceryItem[];

	handleAddToCart: (name: string) => void;
}
const AvailableItems = ({
	title,
	items,
	handleAddToCart,
}: AvailableItemsProps) => {
	return (
		<div className="grocery-type">
			<h2>{title}</h2>

			{items.map((i) => (
				<div key={`${title}-${i.name}`}>
					<span>
						{i.name}: {i.quantity} remaining
					</span>

					<button
						className="icon-button"
						type="button"
						aria-label={`add one ${i.name}`}
						disabled={i.quantity <= 0}
						onClick={() => handleAddToCart(i.name)}
					>
						➕
					</button>
				</div>
			))}
		</div>
	);
};
